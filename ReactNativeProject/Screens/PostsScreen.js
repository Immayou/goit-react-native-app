import React, { useState, useEffect } from "react";
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
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  const [isEmailInputOnFocus, setIsEmailInputOnFocus] = useState(false);
  const [isPasswordInputOnFocus, setIsPasswordInputOnFocus] = useState(false);
  const [loginData, setLoginData] = useState(initialState);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width - 5 * 2,
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

  const onKeyBoardHandler = () => {
    setIsKeyBoardShown(false);
    Keyboard.dismiss();
    setIsPasswordShown(true);
    console.log(loginData);
    setLoginData(initialState);
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
    if (loginData.password !== "") {
      setIsPasswordShown((prevState) => {
        !prevState;
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyBoardHandler}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View
            style={{
              ...styles.form,
              paddingBottom: isKeyBoardShown ? 32 : 144,
              width: dimensions.width,
            }}
          >
            <View style={{ marginBottom: 33 }}>
              <Text style={styles.formTitle}>Войти</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={{
                  ...styles.input,
                  ...styles.inputText,
                  borderColor: isEmailInputOnFocus ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isEmailInputOnFocus ? "#ffffff" : "#F6F6F6",
                }}
                value={loginData.email}
                placeholder="Адрес электронной почты"
                placeholderTextColor={"#BDBDBD"}
                onBlur={() => {
                  setIsEmailInputOnFocus(false);
                }}
                onFocus={onEmailInputHandler}
                onChangeText={(value) =>
                  setLoginData((prevState) => ({
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
                value={loginData.password}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                onBlur={() => {
                  setIsPasswordInputOnFocus(false);
                }}
                onFocus={onPasswordInputHandler}
                onChangeText={(value) =>
                  setLoginData((prevState) => ({
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
                  <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.bottomText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  form: {
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingBottom: 144,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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

const absoluteRightPositionOfInputTextValue =
  styles.input.marginHorizontal + styles.input.padding;
