import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const { chatid } = route.params;

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(chatid)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        let newMessages = snapshot.data().messages.map(singleMessage => {
            singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
            return singleMessage;
        })
        setMessages(newMessages);
      });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    db.collection("Chats")
      .doc(chatid)
      .update({
        // arrayUnion appends the message to the existing array
        messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
        avatar: "https://ca.slack-edge.com/T0242N93U78-U024ZLJMTDJ-07e780348798-512",
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}