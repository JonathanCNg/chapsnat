import firebase from "@firebase/app";
import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function ProfileScreen() {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleCamera = async () => {
    if (Platform.OS !== "web") {
      let permissions = await ImagePicker.getCameraPermissionsAsync();
      if (!permissions.granted) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onPressLogout = async() => {
    await firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Signed Out!")
    }).catch((error) => {
      var errorMessage = error.message
    .   // An error happened.
      alert(errorMessage)
    });
  };

  const onEditAvatar = () => {
    showActionSheetWithOptions(
      {
        options: ["Camera", "Image Library", "Cancel"],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        console.log(buttonIndex)
        if (buttonIndex === 0) {
          handleCamera()
        } else if (buttonIndex === 1) {
          pickImage()
        } else if (buttonIndex === 2) {
        }
      }
    );
  }
  return (
    <View style={styles.container}>
      {firebase.auth().currentUser ? (
        <>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={onEditAvatar}>
              <Image style={styles.userImage} source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100 }} />
            </TouchableOpacity>
            <Text style={styles.userNameText}>
              {firebase.auth().currentUser.displayName}
            </Text>
            <View style={styles.Row}>
              <Text style={styles.descriptionText}>{firebase.auth().currentUser.email}</Text>
            </View>
          </View>
          <View style={styles.Row}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.logoutButton]}
              onPress={onPressLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
       </>
      ) : (
        <View/>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerColumn: {
    backgroundColor: "transparent",
    paddingBottom: 20,
    paddingTop: 45,
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'center',
  },
  descriptionText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  logoutButton: {
    backgroundColor: Colors.snapblue,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

// import { Text, View } from "react-native";
// import firebase from "@firebase/app"

// import React from "react";


// export default function ProfileScreen() {
//   return (
//     <View>
//       <Text>{firebase.auth().currentUser.displayName}</Text>
//     </View>
//   );
// }
