import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};
function Home({ navigation }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#a2e1db",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Nexa-Bold",
          color: "white",
          fontSize: 36,
          marginBottom: 16,
        }}
      >
        Spine Flex App
      </Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("main")}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("about")}
        >
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => BackHandler.exitApp()}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginVertical: 12,
    width: 180,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  buttonText: {
    fontSize: 21,
    fontFamily: "Kollektif",
    color: "#55cbcd",
  },
});

export default Home;
