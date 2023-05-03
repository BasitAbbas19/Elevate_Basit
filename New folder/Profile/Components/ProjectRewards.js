import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProjectRewards = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ padding: 5 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "white" }}>
          Project Title: {props.item.C_NAME}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ fontWeight: "600", fontSize: 13, color: "white" }}>
          Reward Title: {props.item.ITEM_NAME}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ color: "white" }} numberOfLines={2}>
          {props.item.ITEM_DESCRIPTION}
        </Text>
        <Text style={{ color: "#F23B25", marginTop: 5, color: "#D6252E" }}>
          Quantity:{" "}
          <Text style={{ color: "white" }}>{props.item.quantity}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProjectRewards;

const styles = StyleSheet.create({
  card: {
    marginTop: "4%", //#003047    #D6252E
    backgroundColor: "#003047",
    marginHorizontal: "2%",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    borderRadius: Platform.OS === "ios" ? "8%" : 8,
    padding: 10,
  },
});
