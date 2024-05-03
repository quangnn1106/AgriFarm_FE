import * as signalR from '@microsoft/signalr';
const URL = process.env.NEXT_PUBLIC_NOTIFICATION_HUB_ADDRESS ?? 'https://localhost:5001';

interface Connection {
  connection: signalR.HubConnection;
  callbacks: Function[];
}

const basePath = 'https://localhost:7012/';
const connections: Record<string, Connection> = {};

const initializeSignalR = (hubUrl: string, callback: Function) => {
  if (!connections[hubUrl]) {
    console.log("go here")
    connections[hubUrl] = {
      connection: new signalR.HubConnectionBuilder()
        .withUrl(basePath+hubUrl)
        .withAutomaticReconnect()
        .build(),

      callbacks: [callback]
    };

    connections[hubUrl].connection
      .start()
      .then(() => console.log(`Connection established to ${hubUrl}`))
      .catch(err => console.error(`Error starting connection: ${err}`));

    connections[hubUrl].connection.on('messageReceived', data => {
      connections[hubUrl].callbacks.forEach(callback => callback(data));
    });
  } else {
    console.log("go here???, ",connections[hubUrl])

    // If connection already exists, add callback to existing connection
    connections[hubUrl].callbacks.push(callback);
  }

  return connections[hubUrl].connection;
};

export default initializeSignalR;

// class Connector {
//     private connection: signalR.HubConnection;
//     public events: (onMessageReceived: (username: string, message: string) => void) => void;
//     static instances: Record<string,Connector>;
//     static pool: string[]
//     private constructor(hub: string) {

//         this.connection = new signalR.HubConnectionBuilder()
//             .withUrl("https://localhost:7012"+hub)
//             .withAutomaticReconnect()
//             .build();
//         this.connection.start().catch(err => document.write(err));
//         this.events = (onMessageReceived) => {
//             this.connection.on("NotiMessage", (username, message) => {
//                 console.log("trigger event")
//                 onMessageReceived(username, message);
//             });
//         };
//     }
//     public newMessage = (messages: string) => {
//         this.connection.send("newMessage", "foo", messages).then(x => console.log("sent"))
//     }
//     public static getInstance(hub: string): Connector {
//         if(!Connector.instances)
//             Connector.instances = {}

//         const existHub = Connector.instances[hub]

//         if(!existHub){
//             Connector.instances[hub] = new Connector(hub)
//         }

//         return Connector.instances[hub]

//     }
// }
