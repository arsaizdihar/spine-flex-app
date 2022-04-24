import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ColorValue,
  OpaqueColorValue,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type Props = {
  navigation: NativeStackNavigationProp<any>;
  iconColor?: string | OpaqueColorValue | undefined;
  title?: string;
  color?: ColorValue | undefined;
};
function Header(props: Props) {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 25,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="arrow-back" size={42} color={props.iconColor || "white"} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Nexa-Bold",
          color: props.color || "white",
          fontSize: 24,
        }}
      >
        {props.title || "Spine Flex App"}
      </Text>
    </View>
  );
}

export default Header;
