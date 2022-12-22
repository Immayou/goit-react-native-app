import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  const [isLoginInputOnFocus, setIsLoginInputOnFocus] = useState(false);
  const [isEmailInputOnFocus, setIsEmailInputOnFocus] = useState(false);
  const [isPasswordInputOnFocus, setIsPasswordInputOnFocus] = useState(false);
  const [registerData, setRegisterData] = useState(initialState);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width - 5 * 2,
  });

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 5 * 2;
      setDimensions({ width });
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onKeyBoardHandler = () => {
    setIsKeyBoardShown(false);
    Keyboard.dismiss();
    setIsPasswordShown(true);
    console.log(registerData);
    setRegisterData(initialState);
  };

  const onLoginInputHandler = () => {
    setIsKeyBoardShown(true);
    setIsLoginInputOnFocus(true);
  };

  const onEmailInputHandler = () => {
    setIsKeyBoardShown(true);
    setIsEmailInputOnFocus(true);
  };

  const onPasswordInputHandler = () => {
    setIsKeyBoardShown(true);
    setIsPasswordInputOnFocus(true);
  };

  const onPasswordIsShownHandler = () => {
    if (registerData.password !== "") {
      setIsPasswordShown((prevState) => {
        !prevState;
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyBoardHandler}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../assets/BCGImage.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyBoardShown ? 32 : 78,
                width: dimensions.width,
              }}
            >
              <View style={{ position: "relative", alignItems: "center" }}>
                <View
                  style={[
                    styles.userImage,
                    {
                      transform: [
                        { translateY: absolutePositionOfUserImageValue },
                      ],
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
                <TextInput
                  style={{
                    ...styles.input,
                    ...styles.inputText,
                    borderColor: isLoginInputOnFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isLoginInputOnFocus
                      ? "#ffffff"
                      : "#F6F6F6",
                  }}
                  value={registerData.login}
                  placeholder="Логин"
                  placeholderTextColor={"#BDBDBD"}
                  onBlur={() => {
                    setIsLoginInputOnFocus(false);
                  }}
                  onFocus={onLoginInputHandler}
                  onChangeText={(value) =>
                    setRegisterData((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                ></TextInput>
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    ...styles.inputText,
                    borderColor: isEmailInputOnFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isEmailInputOnFocus
                      ? "#ffffff"
                      : "#F6F6F6",
                  }}
                  value={registerData.email}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor={"#BDBDBD"}
                  onBlur={() => {
                    setIsEmailInputOnFocus(false);
                  }}
                  onFocus={onEmailInputHandler}
                  onChangeText={(value) =>
                    setRegisterData((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                ></TextInput>
              </View>
              <View
                style={{
                  position: "relative",
                  marginBottom: isKeyBoardShown ? 0 : 43,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  secureTextEntry={isPasswordShown}
                  style={{
                    ...styles.input,
                    ...styles.inputText,
                    borderColor: isPasswordInputOnFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isPasswordInputOnFocus
                      ? "#ffffff"
                      : "#F6F6F6",
                  }}
                  value={registerData.password}
                  placeholder="Пароль"
                  placeholderTextColor={"#BDBDBD"}
                  onBlur={() => {
                    setIsPasswordInputOnFocus(false);
                  }}
                  onFocus={onPasswordInputHandler}
                  onChangeText={(value) =>
                    setRegisterData((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                ></TextInput>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPasswordIsShownHandler}
                  style={{
                    position: "absolute",
                    right: absoluteRightPositionOfInputTextValue,
                  }}
                >
                  <Text
                    style={{
                      ...styles.inputText,
                      color: "#1B4371",
                    }}
                  >
                    {isPasswordShown ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>
              {!isKeyBoardShown && (
                <View>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={onKeyBoardHandler}
                  >
                    <Text style={styles.btnText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.bottomText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    // paddingBottom: 78,
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
    borderRadius: 8,
  },
  inputText: {
    color: "#000000",
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

const absoluteRightPositionOfInputTextValue =
  styles.input.marginHorizontal + styles.input.padding;

const absolutePositionOfAddImageValue = -(styles.addImage.height / 2);
