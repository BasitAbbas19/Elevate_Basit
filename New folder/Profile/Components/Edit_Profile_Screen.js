import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Modal,
} from "react-native";
import AppContext from "./AppContext";
import { Avatar, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import axios from "axios";
function Edit_Profile_Screen({ navigation }) {
  //const authCtx = useContext(AuthContext);
  //const token = authCtx.token;
  const edit = async () => {
    myContext.setname(name);
    myContext.setcontactno(contactno);
    await axios
      .patch(`http://192.168.1.8:3080/profile/editprofile`, {
        name: name,
        contact: contactno,
        //token: token,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYmFzYmFzaXQ3MjNAZ21haWwuY29tIiwibmFtZSI6IlN5ZWQgQmFzaXQgQWJiYXMiLCJpYXQiOjE2ODI4NzE1MjcsImV4cCI6MTY4Mjg3ODcyN30.nlhDSYwQ05B0L3QVhfCBxTL_3FiZmRL2dJjYKe_p0vU",
      })
      .then(function (response) {
        console.log(new Date().toString());
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const edit_image = async () => {
    await axios
      .patch(`http://192.168.1.8:3080/profile/editprofile`, {
        image: myContext.pickedImagePath,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYmFzYmFzaXQ3MjNAZ21haWwuY29tIiwibmFtZSI6IlN5ZWQgQmFzaXQgQWJiYXMiLCJpYXQiOjE2ODI4NzE1MjcsImV4cCI6MTY4Mjg3ODcyN30.nlhDSYwQ05B0L3QVhfCBxTL_3FiZmRL2dJjYKe_p0vU",
      })
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setname(myContext.name);
    setcontactno(myContext.contactno);
    setcnic(myContext.cnic);
    setEmail(myContext.email);
  }, []);
  useEffect(() => {}, [errprompt]);

  const showImagePicker = async () => {
    myContext.setimageset(true);
    myContext.setPickedImagePath("data:image/jpg;base64,null");
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (!result.cancelled) {
      myContext.setPickedImagePath(result.base64);
    }
  };
  const myContext = useContext(AppContext);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [text, settext] = useState(true);
  const [contactno, setcontactno] = useState("");
  const [cnic, setcnic] = useState("");
  const [errprompt, seterrprompt] = useState({});
  function checkcredentials(e1, e2) {
    let errors = {};
    if (e1 === "") {
      errors.name = "Name is required";
      settext(false);
    }
    if (e2 === "") {
      errors.contactno = "Contact number is required";
      settext(false);
    } else if (e2.length !== 11) {
      errors.contactno = "contact number must be 11 numbers";
      settext(false);
    }
    return errors;
  }
  const submit = () => {
    settext(true);
    seterrprompt(checkcredentials(name, contactno));
    if (Object.keys(checkcredentials(name, contactno)).length === 0) {
      edit();
    }

    // settext(true);
  };
  const [show, setshow] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === "ios" ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: "4%" }}>
          {myContext.imageset ? (
            myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
              <Avatar.Image
                size={100}
                source={{
                  uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                }}
              />
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )
          ) : (
            (myContext.setPickedImagePath("data:image/jpg;base64,null"),
            (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            ))
          )}
          <Button
            title="Change Profile Photo"
            color={"#D6252E"}
            onPress={() => {
              setshow(true);
            }}
          />
          <Button
            title="Change Password"
            color={"#D6252E"}
            onPress={() => {
              navigation.navigate("Change Password");
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginTop: "4%" }}>
          {myContext.imageset ? (
            myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
              <Avatar.Image
                size={100}
                source={{
                  uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                }}
              />
            ) : (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            )
          ) : (
            (myContext.setPickedImagePath("data:image/jpg;base64,null"),
            (
              <Avatar.Image
                size={100}
                source={require("../assets/Userr.png")}
              />
            ))
          )}
          <View style={{ marginBottom: "2%" }}></View>
          <Button
            color={"#D6252E"}
            title="Change Profile Photo"
            onPress={() => {
              setshow(true);
            }}
          />
          <View style={{ marginBottom: "2%" }}></View>
          <Button
            title="Change Password"
            color={"#D6252E"}
            onPress={() => {
              navigation.navigate("Change Password");
              //console.log("hELLO");
            }}
          />
        </View>
      )}
      <View
        style={{
          flex: 3,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          marginTop: "5%",
          borderColor: "#dcdcdc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "4%",
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(element) => {
              setname(element);
            }}
            placeholder="Enter Name"
            style={{
              marginLeft: "10%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View style={{ marginLeft: "25%", marginTop: "1%" }}>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
            {errprompt.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Contact</Text>
          <TextInput
            value={contactno}
            onChangeText={(element) => {
              setcontactno(element);
            }}
            placeholder="Enter Contact Number"
            style={{
              marginLeft: "6%",
              backgroundColor: "#ffffff",
              width: "80%",
              height: 40,
            }}
          />
        </View>
        <View style={{ marginLeft: "25%", marginTop: "1%" }}>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
            {errprompt.contactno}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "4%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
            }}
          >
            <Text style={{ marginLeft: "3%", fontSize: 17 }}>CNIC</Text>
            <Text
              style={{
                marginLeft: "13%",
                backgroundColor: "#ffffff",
                width: "80%",
                height: 40,
                fontSize: 16,
                color: "#708090",
              }}
            >
              {cnic}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "-3%",
            marginBottom: "4%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
            }}
          >
            <Text style={{ marginLeft: "3%", fontSize: 17 }}>Email</Text>
            <Text
              style={{
                marginLeft: "13%",
                backgroundColor: "#ffffff",
                width: "80%",
                height: 40,
                fontSize: 16,
                color: "#708090",
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "-2%",
            marginBottom: "5%",
            borderTopWidth: 1,
            borderColor: "#dcdcdc",
          }}
        ></View>
        {Platform.OS === "ios" ? (
          <View>
            <Button title="Submit" color={"#D6252E"} onPress={submit}></Button>
          </View>
        ) : (
          <View style={{ width: "20%", alignSelf: "center" }}>
            <Button title="Submit" color={"#D6252E"} onPress={submit}></Button>
          </View>
        )}
      </View>

      <Modal visible={show} animationType="slide" transparent={true}>
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {Platform.OS === "ios" ? (
            <View
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "83%",
                marginBottom: "8%",
                backgroundColor: "#ffffff",
                borderRadius: 9,
                flex: 4,
              }}
            >
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                {myContext.imageset ? (
                  myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
                    <Avatar.Image
                      size={100}
                      source={{
                        uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                      }}
                    />
                  ) : (
                    <Avatar.Image
                      size={100}
                      source={require("../assets/Userr.png")}
                    />
                  )
                ) : (
                  <Avatar.Image
                    size={100}
                    source={require("../assets/Userr.png")}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: "4%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 14,
                  }}
                >
                  Synced Profile Photo
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: "5%",
                }}
                onPress={() => myContext.setimageset(false)}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Remove Photo
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                }}
                onPress={showImagePicker}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Upload Photo
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "89%",
                marginBottom: "8%",
                backgroundColor: "#ffffff",
                borderRadius: 9,
                flex: 4,
              }}
            >
              <View style={{ alignItems: "center", marginTop: "5%" }}>
                {myContext.imageset ? (
                  myContext.pickedImagePath !== "data:image/jpg;base64,null" ? (
                    <Avatar.Image
                      size={100}
                      source={{
                        uri: `data:image/jpg;base64,${myContext.pickedImagePath}`,
                      }}
                    />
                  ) : (
                    <Avatar.Image
                      size={100}
                      source={require("../assets/Userr.png")}
                    />
                  )
                ) : (
                  <Avatar.Image
                    size={100}
                    source={require("../assets/Userr.png")}
                  />
                )}
              </View>
              <View style={{ alignItems: "center", marginTop: "4%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 14,
                  }}
                >
                  Synced Profile Photo
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "23%",
                  borderColor: "#dcdcdc",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: "5%",
                }}
                onPress={() => myContext.setimageset(false)}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Remove Photo
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#003047",
                  height: "25%",
                  borderColor: "#dcdcdc",
                }}
                onPress={showImagePicker}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: "5.5%",
                    color: "#f5f5f5",
                  }}
                >
                  Upload Photo
                </Text>
              </Pressable>
            </View>
          )}
          <Pressable
            style={{
              borderRadius: 9,
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "2%",
              height: "5.5%",
              backgroundColor: "#D6252E",
            }}
            onPress={() => edit_image()}
          >
            <Text
              style={{
                fontWeight: "normal",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 18,
                textAlign: "center",
                marginTop: "2%",
                color: "#f5f5f5",
              }}
            >
              Save
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "3%",
              height: "5%",
            }}
            onPress={() => setshow(false)}
          >
            <Text
              style={{
                fontWeight: "normal",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 18,
                textAlign: "center",
                marginTop: "1.5%",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
export default Edit_Profile_Screen;
