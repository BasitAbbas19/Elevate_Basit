import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BackedProjects = (props) => {
  const navigation = useNavigation();

  const DaysLeft = (props) => {
    let xd = Date.parse(props.data);
    let z = new Date();
    let x = (xd - z) / (1000 * 60 * 60);

    if (x <= 0) {
      return 0;
    } else {
      return Math.floor(x);
    }
  };

  const daysLeft = (props) => {
    let xd = Date.parse(props.item.C_END_DATETIME);
    let z = new Date();
    let x = (xd - z) / (1000 * 60 * 60);

    if (x <= 0) {
      return 0;
    } else {
      return Math.floor(x);
    }
  };

  return (
    <Pressable
      style={styles.card}
      //   onPress={() => {
      //     navigation.navigate("Details", {
      //       title: props.item.C_NAME,
      //       data: "data:image/jpeg;base64," + props.item.C_IMAGE,
      //       disc: props.item.C_DESCRIPTION,
      //       funded: Math.ceil((props.item.sum / props.item.C_GOAL) * 100),
      //       backed: props.item.count,
      //       hours: <DaysLeft data={props.item.C_END_DATETIME} />,
      //       Name: props.item.name,
      //       C_ID: props.item.C_ID,
      //       total: Math.floor(props.item.sum),
      //       GOAL: props.item.C_GOAL,
      //     });
      //   }}
    >
      <View style={{ flex: 1 }}>
        <Image style={styles.tinyLogo} source={props.item.C_IMAGE} />
      </View>
      <View style={{ flex: 2.1, paddingHorizontal: 5, paddingTop: 5 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "white" }}>
          {props.item.C_NAME}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ color: "white" }} numberOfLines={2}>
          {props.item.C_DESCRIPTION}
        </Text>
        <Text
          style={{
            color: "#F23B25",
            marginTop: 10,
            fontWeight: "500",
            color: "#D6252E",
          }}
        >
          Amount Invested:{" "}
          <Text style={{ color: "white" }}>{props.item.sum + " Rs"}</Text>
        </Text>
        <Text style={{ color: "#F23B25", fontWeight: "500", color: "#D6252E" }}>
          Status:{" "}
          {daysLeft(props) <= 0 ? (
            <Text style={{ color: "white" }}>Closed </Text>
          ) : (
            <Text style={{ color: "white" }}>Active</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default BackedProjects;

const styles = StyleSheet.create({
  card: {
    marginTop: "3%",
    backgroundColor: "#003047",
    marginHorizontal: "2%",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    borderRadius: Platform.OS === "ios" ? "8%" : 8,
    padding: 10,
    flexDirection: "row",
  },
  tinyLogo: {
    width: 100,
    height: 80,
  },
});
