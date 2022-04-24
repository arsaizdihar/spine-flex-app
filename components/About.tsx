import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";
import Header from "./Header";

function About({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 32 }}>
      <Header
        navigation={navigation}
        iconColor={COLORS.SECONDARY}
        color={COLORS.PRIMARY_DARK}
        title="About"
      />
      <ScrollView>
        <Text style={styles.text}>
          Spine Flex App merupakan sebuah aplikasi yang dirancang untuk
          mendeteksi kebungkukan tubuh. Aplikasi ini pada awalnya dirancang oleh
          tiga mahasiswa dari Institut Teknologi Bandung dengan tujuan untuk
          memenuhi tugas besar mata kuliah Pengantar Rekayasa dan Desain di
          semester 2.
        </Text>
        <Text style={styles.text}>
          Seiring berlalunya zaman, kita dapat melihat perubahan postur tubuh
          manusia yang awalnya tegak dan tegap menjadi bungkuk. Salah satu
          penyebabnya adalah kebiasaan manusia modern dalam menggunakan gadget
          atau dengan posisi bungkuk, menopang beban yang berat terlalu sering,
          dan berat badan yang berlebih. Akibatnya sangat fatal, baik dari segi
          kesehatan maupun psikologi. Kebiasaan bungkuk dapat menyebabkan
          masalah kardiovaskular hingga kifosis. Posisi bungkuk juga dapat
          mengganggu proses pencernaan manusia dan menimbun lemak. Secara
          psikologis, posisi bungkuk ternyata dapat menurunkan mood, menimbulkan
          stress, hingga menyebakan depresi.
        </Text>
        <Text style={styles.text}>
          Aplikasi ini membantu pengguna untuk memperbaiki postur tubuh ketika
          sedang bungkuk. Aplikasi akan memberikan peringatan berupa notifikasi
          agar pengguna memperbaiki posisi tubuhnya menjadi lebih tegap. Cara
          menggunakannya juga sangat mudah, cukup menautkan sensor melalui
          bluetooth dan melekatkan sensor di belakang punggung, maka aplikasi
          akan berjalan secara otomatis.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nexa-Bold",
    fontSize: 16,
    marginTop: 12,
    textAlign: "justify",
    lineHeight: 24,
    paddingHorizontal: 32,
  },
});
export default About;
