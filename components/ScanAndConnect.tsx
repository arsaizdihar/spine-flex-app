import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Device } from "react-native-ble-plx";

interface Props {
  availableDevices: Device[];
  connectDevice: (device: Device) => Promise<void>;
  connectedDevice: Device | undefined;
}

function ScanAndConnect({
  availableDevices,
  connectDevice,
  connectedDevice,
}: Props) {
  return (
    <>
      <Text
        style={{
          ...styles.kollektif,
          fontSize: 16,
          marginTop: 24,
          width: "100%",
        }}
      >
        {connectedDevice ? "Paired device" : "Available device"}
      </Text>
      {connectedDevice && (
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            marginTop: 16,
            backgroundColor: "white",
            borderRadius: 100,
            shadowColor: "#756f6f",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 5,
          }}
        >
          <Text style={{ ...styles.kollektif, fontSize: 22 }}>
            {connectedDevice.name}
          </Text>
        </View>
      )}
      {availableDevices.length > 0 &&
        connectedDevice === undefined &&
        availableDevices.map((device) => (
          <View
            key={device.id}
            style={{
              flexDirection: "row",
              marginVertical: 8,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 8,
              padding: 12,
              width: "95%",
            }}
          >
            <Text style={{ ...styles.kollektif }}>{device.name}</Text>
            <TouchableOpacity
              onPress={() => {
                try {
                  connectDevice(device).catch((err) => console.log(err));
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <Text style={{ ...styles.kollektif, color: "#38b6ff" }}>
                Pair
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </>
  );
}
const styles = StyleSheet.create({
  kollektif: { fontFamily: "Kollektif", fontSize: 16 },
});

export default ScanAndConnect;
