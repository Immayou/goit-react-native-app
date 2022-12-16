import React, { useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("../assets/BCGImage.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.form}>
          <View style={{ position: "relative", alignItems: "center" }}>
            <View
              style={[
                styles.userImage,
                {
                  transform: [{ translateY: absolutePositionOfUserImageValue }],
                },
              ]}
            >
              <ImageBackground
                source={require("../assets/add.png")}
                resizeMode="cover"
                style={[
                  styles.addImage,
                  {
                    transform: [
                      { translateX: absolutePositionOfAddImageValue },
                    ],
                  },
                ]}
              ></ImageBackground>
            </View>
          </View>
          <View style={{ marginBottom: 33 }}>
            <Text style={styles.formTitle}>Регистрация</Text>
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput style={styles.input}>
              <Text style={styles.inputText}>Логин</Text>
            </TextInput>
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput style={styles.input}>
              <Text style={styles.inputText}>Адрес электронной почты</Text>
            </TextInput>
          </View>
          <View style={{ marginBottom: 43 }}>
            <TextInput secureTextEntry={true} style={styles.input}>
              <Text style={styles.inputText}>Пароль</Text>
            </TextInput>
            <Text style={styles.inputText}>Показать</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingBottom: 78,
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  userImage: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addImage: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    left: "100%",
  },
  formTitle: {
    textAlign: "center",
    letterSpacing: 0.01,
    lineHeight: 35,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  input: {
    marginHorizontal: 16,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  inputText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  bottomText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
});

const absolutePositionOfUserImageValue = -(
  styles.userImage.height +
  styles.form.paddingTop -
  styles.userImage.height / 2
);

const absolutePositionOfAddImageValue = -(styles.addImage.height / 2);
