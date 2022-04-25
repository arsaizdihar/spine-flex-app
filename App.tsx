import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import About from "./components/About";
import Home from "./components/Home";
import Main from "./components/Main";

const Stack = createNativeStackNavigator();
function App() {
  const [fontsLoaded] = useFonts({
    "Nexa-Bold": require("./assets/fonts/Nexa-Bold.otf"),
    Kollektif: require("./assets/fonts/Kollektif.ttf"),
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="about"
          component={About}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default App;
