import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "@firebase/app";

import React, {useState, useEffect } from "react";
import Colors from "../constants/Colors";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onPressCreate = async () => {  
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(login_Success, login_Failed);
  };

  const login_Success = (userCrediential) => {
    console.log("SUCCESS");
    var curr_user = userCrediential.user;
    curr_user.updateProfile({
        displayName: name,
    })
  };

  const login_Failed = () => {
    alert("Login failure. Please try again.");
  };

    return (
    <View>
      <Text>SignUp</Text>
      <Text>Name:</Text>
      <TextInput onChangeText={setName}/>
      <Text>Email:</Text>
      <TextInput onChangeText={setEmail}/>
      <Text>Password (6+ characters):</Text>
      <TextInput secureTextEntry={true} onChangeText={setPassword}/>
      <TouchableOpacity
          onPress={onPressCreate}
          style={{backgroundColor: Colors.snapblue}}
        >
          <Text accessibilityLabel={"Sign Up"}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}
