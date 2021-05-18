import * as React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function withShadow({ children, style }: View["props"]) {
  return <View style={[styles.shadow, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 9,
    shadowColor: "#000000",
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Colors.background,
  },
});
