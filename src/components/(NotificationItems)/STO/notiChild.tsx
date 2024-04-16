import { useSignalRNotification } from '@/components/context/notification/SignalRNotifyContext';
import { useEffect, useState } from 'react';

export default function MessageBox() {
//   const { messages } = useSignalRNotification();

//   const [notiItems, setNotiItems] = useState<string[]>(messages);

//   useEffect(() => {
//     console.log('List now: ', messages);
//     setNotiItems(messages);
//   }, [messages]);

//   const renderItem = () => {
//     return notiItems.map((e, i) => <div key={i}>Message: {e}</div>);
//   };

  return (
    <>
      {/* <div>Message Now: {messages.length}</div> */}
      <div>Message list</div>
      <div
        style={{
          height: 400,
          width: 400,
          border: '1px solid'
        }}
      >
        {/* {renderItem()} */}
        content
      </div>
    </>
  );
}
