import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Pressable,
} from "react-native";
const Search_Screen = ({ navigation }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);
  const fetchPosts = () => {
    const apiURL = "http://192.168.1.36:3080/Campaign/projectdetails";
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setfilteredData(responseJson);
        setmasterData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.campaign_title
          ? item.campaign_title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <Pressable
        style={{ backgroundColor: "#003047" }}
        android_ripple={{ borderless: false, color: "lightgrey" }}
        onPress={() => {
          // navigation.navigate("Details", {
          //   title: item.C_NAME,
          //   data: "data:image/jpeg;base64," + item.C_IMAGE,
          //   disc: item.C_DESCRIPTION,
          //   funded: Math.ceil((item.sum / item.C_GOAL) * 100),
          //   backed: item.count,
          //   hours: <DaysLeft data={item.C_END_DATETIME} />,
          //   Name: item.first_name + " " + item.last_name,
          //   C_ID: item.C_ID,
          //   total: Math.floor(item.sum),
          //   GOAL: item.C_GOAL
          // });
          alert("Hello");
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{ justifyContent: "center", marginLeft: "2%", width: "30%" }}
          >
            <Image
              style={{
                height: "80%",
                width: "100%",
              }}
              source={{ uri: item.campaign_image }}
            />
          </View>
          <View>
            <Text style={styles.itemStyle}>
              {"Product Name : " + item.campaign_title.toUpperCase() + "\n\n"}
              {"Description : "}
              {item.campaign_description.length < 70
                ? item.campaign_description
                : item.campaign_description.slice(0, 75) + "..."}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };
  const ListFooter = () => {
    return <View style={styles.headerFooterStyle}></View>;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <Image
            source={require("../assets/Search.png")}
            style={styles.imageStyle}
          />
          <TextInput
            style={{ flex: 1 }}
            value={search}
            placeholder=" Search Here"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(Item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          maxToRenderPerBatch={5}
          ListFooterComponent={ListFooter}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 30,
    color: "white",
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
    flex: 1,
  },
  headerFooterStyle: {
    width: "100%",
    height: 45,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 0.5,
    borderColor: "#dcdcdc",
    height: 40,
    borderRadius: 10,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignItems: "center",
    backgroundColor: "#dcdcdc",
  },
});
export default Search_Screen;
