import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;

// import React, { useState, useCallback, useEffect } from 'react'
// import { StyleSheet, Text, View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat'
// import db from "./firebase"
// import firebase from "firebase/app"

// export default function App() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // db.collection("Chats")
//     //   .doc("myfirstchat")
//     //   .get()
//     //   .then((snapshot) => {
//     //     setMessages(snapshot.data().messages) //reversed order
//     //   });

//       db.collection("Chats")
//       .doc("myfirstchat")
//       .onSnapshot((snapshot) => {
//         console.log("New Snapshot!");
//           setMessages(snapshot.data().messages) //reversed order
//         });

//         return function cleanupBeforeUnmounting() {
//           unsubscribeFromNewSnapshots();
//         };
//   }, [])



//   const onSend = useCallback((messages = []) => {
//     // db.collection("Chats").doc("myfirstchat").set({ messages: messages });
//     db.collection("Chats")
//     .doc("myfirstchat")
//     .update({
//       // arrayUnion appends the message to the existing array
//       messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
//     });
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//       <GiftedChat
//         placeholder={"SAY SOMETHING BRO"}
//         isTyping={true}
//         alwaysShowSend={true}
//         renderUsernameOnMessage={true}
//         showUserAvatar={true}
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: "1",
//           name: "Jon",
//           avatar: 'https://ca.slack-edge.com/T0242N93U78-U024ZLJMTDJ-07e780348798-512',
//         }}
//       />
//   )
// }
