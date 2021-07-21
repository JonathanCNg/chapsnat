import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputs}
          onChangeText={setName}
          placeholder={"Name"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputs}
          onChangeText={setEmail}
          placeholder={"Email"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput  
          style={styles.inputs}
          onChangeText={setPassword}
          placeholder={"Password (6+ characters)"}
        />
      </View>
      <TouchableOpacity
          onPress={onPressCreate}
          style={{...styles.buttonContainer, backgroundColor: Colors.snapblue}}
        >
          <Text style={{fontWeight: 'bold'}} accessibilityLabel={"Sign Up"}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.snapyellow,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
});
