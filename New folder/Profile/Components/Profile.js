const sum1 = 8000;
const goal1 = 10000;
const sum2 = 1000;
const goal2 = 10000;
const sum3 = 900;
const goal3 = 1000;
const backnum = 4;
const rewnum = 3;
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Header,
  Image,
  Pressable,
  Button,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AppContext from "./AppContext";
import { Avatar, Title } from "react-native-paper";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectRewards from "./ProjectRewards";
import BackedProjects from "./BackedProjects";
const Tab = createMaterialTopTabNavigator();
const Profile = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const name = "Syed Basit Abbas ";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginBottom: "-5%",
        }}
      >
        {!myContext.Is_data ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              size={40}
              color="#F23B25"
              style={{
                marginTop: "40%",
                alignItems: "center",
                marginLeft: "170%",
              }}
            />
          </View>
        ) : Platform.OS === "ios" ? (
          <View
            style={{
              flex: 0.85,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "3%",
              marginBottom: "10%",
            }}
          >
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
        ) : (
          <View
            style={{
              flex: 0.85,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "3%",
              marginBottom: "10%",
              marginTop: "10%",
            }}
          >
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
        )}
        {Platform.OS === "ios" ? (
          <View
            style={{
              marginTop: "19%",
              flex: 2.4,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 24,
              }}
            >
              {myContext.name}
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: "28%",
              flex: 2.4,
              marginLeft: "2%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 24,
              }}
            >
              {myContext.name}
            </Text>
          </View>
        )}
      </View>
      <Button
        title="Pay"
        onPress={() => navigation.navigate("Profitbased Investment")}
      />
      <Pressable
        style={{
          backgroundColor: "#D6252E", //"#dcdcdc",
          height: "4%",
          borderColor: "#dcdcdc",
          borderRadius: 8,
          marginLeft: "5%",
          marginRight: "5%",
          marginBottom: "5%",
        }}
        onPress={() => navigation.navigate("Edit_Profile")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
            fontSize: 15,
            textAlign: "center",
            paddingTop: "1%",
            color: "#f5f5f5",
          }}
        >
          Edit Profile
        </Text>
      </Pressable>
      <View
        style={{
          flex: 3,
        }}
      >
        {backnum < 10 ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginLeft: "24%" }}>{backnum}</Text>
            <Text style={{ marginLeft: "48%" }}>{rewnum}</Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginLeft: "23%" }}>{backnum}</Text>
            <Text style={{ marginLeft: "47%" }}>{rewnum}</Text>
          </View>
        )}

        <Tab.Navigator style={{ marginTop: "-0.9%" }}>
          <Tab.Screen
            name=" Backed projects"
            component={BackedScrenn}
          ></Tab.Screen>

          <Tab.Screen name=" Rewards" component={RewardScreen}></Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
function BackedScrenn({ navigation }) {
  const backedscreen_text1 = "Explore Creative Projects";
  const backedscreen_text2 =
    "Pledge to your favourites, then view all the projects you've backed here.";
  const [data, setData] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setRewards(backset);
  }, []);
  useEffect(() => {
    if (rewards.length === 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [rewards, data]);
  return loader ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#F23B25" />
    </View>
  ) : rewards.length === 0 ? (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{
          marginTop: "30%",
          paddingBottom: "3%",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
            fontSize: 24,
          }}
        >
          {backedscreen_text1}
        </Text>
      </Pressable>
      <Text
        style={{
          fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
          marginHorizontal: "5%",
          fontSize: 16,
          color: "#808080",
          textAlign: "center",
        }}
      >
        {backedscreen_text2}
      </Text>

      {Platform.OS === "ios" ? (
        <View>
          <Button
            title="View Backed Projects"
            color={"#D6252E"}
            onPress={() => setRewards(backset)}
          ></Button>
        </View>
      ) : (
        <View style={{ width: "50%", alignSelf: "center", marginTop: "3%" }}>
          <Button
            title="View Backed Projects"
            color={"#D6252E"}
            onPress={() => setRewards(backset)}
          ></Button>
        </View>
      )}
    </View>
  ) : (
    <View>
      <FlatList
        alwaysBounceVertical={false}
        data={rewards}
        renderItem={({ item }) => {
          return <BackedProjects item={item} />;
        }}
        keyExtractor={(item, index) => {
          return item.C_ID;
        }}
        // onRefresh={fetch_reward}
        // refreshing={loader}
      />
      <View style={{ marginTop: "0%" }}></View>
      {Platform.OS === "ios" ? (
        <View>
          <Button
            title="Search Campaigns"
            color={"#D6252E"}
            onPress={() => setRewards([])}
          ></Button>
        </View>
      ) : (
        <View style={{ width: "50%", alignSelf: "center", marginTop: "3%" }}>
          <Button
            title="Search Campaigns"
            color={"#D6252E"}
            onPress={() => setRewards([])}
          ></Button>
        </View>
      )}
    </View>
  );
}
function RewardScreen() {
  const [data, setData] = useState(true);
  const backedscreen_text1 = "No Rewards Available";
  const [rewards, setRewards] = useState([]);
  //const RewardScreenData = "This is rewards screen";
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setRewards(rewardset);
  }, []);
  useEffect(() => {
    if (rewards.length === 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [rewards, data]);
  return loader ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#F23B25" />
    </View>
  ) : rewards.length === 0 ? (
    <View style={{ flex: 1 }}>
      <Text style={{ alignSelf: "center" }}>{backedscreen_text1}</Text>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <FlatList
        alwaysBounceVertical={false}
        data={rewards}
        renderItem={({ item }) => {
          return <ProjectRewards item={item} />;
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
        // onRefresh={fetch_reward}
        // refreshing={loader}
      />
    </View>
  );
}
const backset = [
  {
    C_NAME: "my project",
    C_DESCRIPTION: "This is project discription",
    count: 8,
    C_END_DATETIME: "2022-11-25",
    C_IMAGE: require("../assets/Userr.png"),
    C_ID: 1,
    name: "Mustafain Raza",
    C_GOAL: goal1,
    sum: Math.ceil(sum1),
  },
  {
    C_NAME: "Cameron",
    C_DESCRIPTION:
      "This Cameron is basically a Bike Helmet and this is very important for bike riding",
    count: 10,
    C_END_DATETIME: "2022-11-20",
    C_IMAGE: require("../assets/Userr.png"),
    C_ID: 2,
    name: "Mustafain Raza",
    C_GOAL: goal2,
    sum: Math.ceil(sum2),
  },
  {
    C_NAME: "Our FYP",
    C_DESCRIPTION:
      "This is Our Final Year Project which needs to be funded so that we can work in the future",
    count: 20,
    C_END_DATETIME: "2022-11-11",
    C_IMAGE: require("../assets/Userr.png"),
    C_ID: 3,
    name: "Mustafain Raza",
    C_GOAL: goal3,
    sum: Math.ceil(sum3),
  },
];
const rewardset = [
  {
    C_NAME: "Camapign 1",
    ITEM_NAME: "Reward 1",
    ITEM_DESCRIPTION: "This is project Reward 1 description",
    quantity: 1,
  },
  {
    C_NAME: "Camapign 2",
    ITEM_NAME: "Reward 2",
    ITEM_DESCRIPTION: "This is project Reward 2 description",
    quantity: 2,
  },
  {
    C_NAME: "Camapign 3",
    ITEM_NAME: "Reward 3",
    ITEM_DESCRIPTION: "This is project Reward 3 description",
    quantity: 3,
  },
];
export default Profile;
