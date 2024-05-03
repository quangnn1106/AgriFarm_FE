import { memoizeHashlike } from '@fullcalendar/core/internal';
import * as signalR from '@microsoft/signalr';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useRef } from 'react';

export interface NotifyMessage {
  content: string;
  date: Date;
  ref?: string;
}

interface ISignalRContext {
  connectionNotification: React.MutableRefObject<signalR.HubConnection | null>;
  isConnected: boolean;
  identify: string;
  messages: NotifyMessage[];
}

const SignalRContext = React.createContext<ISignalRContext | null>(null);

const NotificationContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data: session } = useSession();
  const connectionNotification = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [identify, setIdentify] = useState('common');

  const [messages, setMessages] = useState<NotifyMessage[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()

      .withUrl(
        `${'http://localhost:5024'}/${'noti'}`
        // ,
        // {
        //     accessTokenFactory:()=>session?.user.accessToken??""
        // }
      )
      .withAutomaticReconnect()
      .build();
    setIsConnected(true);
    connectionNotification.current = connection;
    connection
      .start()
      .then(res => {
        setIdentify(session?.user.email ?? identify);
        // console.log("User is 1: ", session?.user)
        connection.invoke('JoinGroup', session?.user.userInfo.id).catch(err => {
          console.log(err);
        });

        connection.invoke('JoinGroup', session?.user.userInfo.siteId).catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
    connection.on('Noti', (type: number, message: string, date: Date, ref?: string) => {
      console.log('Data1: ', type);
      console.log('Data2: ', message);
      console.log('Data3: ', date);
      const newMsg: NotifyMessage = {
        content: message,
        date: date
      };
      switch (type) {
        case 0:
          newMsg.ref = '/activities/' + ref;
          break;
        case 1:
          newMsg.ref = '/..../' + ref;
          break;
        default:
          break;
      }
      setMessages(prev => [newMsg,...prev]);
    });
    return () => {
      connection?.stop();
    };
  }, [session]);

  return (
    <SignalRContext.Provider
      value={{ connectionNotification, isConnected, identify, messages }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

const useSignalRNotification = () => {
  const context = useContext(SignalRContext);
  if (context === null) {
    throw new Error('useSignalR must be used within a SignalRCallContextProvider');
  }
  return context;
};

export { NotificationContextProvider, useSignalRNotification };
