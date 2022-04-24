import { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import base64 from "react-native-base64";
import { BleManager, Device } from "react-native-ble-plx";
import BluetoothStateManager, {
  BluetoothState,
} from "react-native-bluetooth-state-manager";
import { COLORS } from "../constants";
import Header from "./Header";
import ScanAndConnect from "./ScanAndConnect";
const manager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const DEGREE_UUID = "6982c700-c237-11ec-9d64-0242ac120002";

const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

export default function Main({ navigation }: any) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device>();
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [bluetoothState, setBluetoothState] =
    useState<BluetoothState>("Unknown");
  const [message, setMessage] = useState("SAFE");
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    async function checkConnected() {
      const devices = await manager.connectedDevices([SERVICE_UUID]);
      if (devices.length > 0) {
        setIsConnected(true);
        setConnectedDevice(devices[0]);
      }
    }
    checkConnected();
  }, []);

  useEffect(() => {
    BluetoothStateManager.onStateChange((state) => {
      setBluetoothState(state);
      manager.stopDeviceScan();
    }, true);
  }, []);
  useEffect(() => {
    if (bluetoothState !== "PoweredOn") return;
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Permission Localisation Bluetooth",
        message: "Requirement for Bluetooth",
        buttonNeutral: "Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    ).then(async (answer: any) => {
      if ((await manager.connectedDevices([SERVICE_UUID])).length > 0) return;
      ToastAndroid.showWithGravity(
        "Scanning devices...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      let devices: Device[] = [];
      setAvailableDevices([]);
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }
        if (scannedDevice && scannedDevice.name) {
          if (!devices.find((device) => device.id === scannedDevice.id)) {
            devices.push(scannedDevice);
            setAvailableDevices([...devices]);
          }
        }
      });
    });
    return () => {
      manager.stopDeviceScan();
    };
  }, [bluetoothState]);

  async function connectDevice(device: Device) {
    console.log("connecting to Device:", device.name);
    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setAvailableDevices([]);
        setIsConnected(true);
        ToastAndroid.showWithGravity(
          `${device.name} connected.`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        //  Set what to do when DC is detected
        manager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
          setConnectedDevice(undefined);
        });

        // Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setMessage(base64.decode(valenc?.value || ""));
          });

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          DEGREE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setDegree(parseInt(base64.decode(characteristic?.value)));
              console.log("Degree: ", base64.decode(characteristic?.value));
            }
          },
          "degreetransaction"
        );

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic?.value)
              );
            }
          },
          "messagetransaction"
        );

        console.log("Connection established");
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          "Error connecting device",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }

  return (
    <View
      style={{ flex: 1, position: "relative", backgroundColor: COLORS.SURFACE }}
    >
      <View
        style={{
          position: "absolute",
          height: 400,
          top: -70,
          left: "-40%",
          width: "180%",
          bottom: "50%",
          backgroundColor: COLORS.SECONDARY,
          borderBottomRightRadius: 2000,
          borderBottomLeftRadius: 2000,
        }}
      />
      <View
        style={{
          position: "absolute",
          height: 400,
          top: -100,
          left: "-40%",
          width: "180%",
          bottom: "50%",
          backgroundColor: COLORS.PRIMARY,
          borderBottomRightRadius: 2000,
          borderBottomLeftRadius: 2000,
        }}
      />

      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            paddingVertical: 24,
            width: "80%",
            marginTop: 120,
            alignItems: "center",
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 8,
          }}
        >
          <Text style={{ fontFamily: "Kollektif", fontSize: 24 }}>
            Hunchback's Degree
          </Text>
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 72,
              color: COLORS.PRIMARY_DARK,
              marginTop: 24,
            }}
          >
            {isConnected ? degree : "0"}°
          </Text>
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 42,
              marginTop: 12,
              color: message === "SAFE" ? "#38b6ff" : "#ff5757",
            }}
          >
            {isConnected ? message : ""}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            marginTop: 24,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 10,
          }}
        >
          <Switch
            thumbColor={"white"}
            trackColor={{ false: "c4c4c4", true: "#38b6ff" }}
            style={{
              marginLeft: 12,
              transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
            }}
            value={bluetoothState === "PoweredOn"}
            onValueChange={(value) => {
              if (value && bluetoothState === "PoweredOff") {
                BluetoothStateManager.enable();
              } else if (!value && bluetoothState === "PoweredOn") {
                manager.stopDeviceScan();
                setConnectedDevice(undefined);
                setIsConnected(false);
                setAvailableDevices([]);
                BluetoothStateManager.disable();
              }
            }}
          />
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 20,
              color: "white",
              marginRight: 16,
            }}
          >
            Bluetooth
          </Text>
        </View>
        <View style={{ width: "70%", alignItems: "center" }}>
          {bluetoothState === "PoweredOn" && (
            <ScanAndConnect
              connectedDevice={connectedDevice}
              availableDevices={availableDevices}
              connectDevice={connectDevice}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 24,
  },
});
