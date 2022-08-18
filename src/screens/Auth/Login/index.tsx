/**
 * @format
 */
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { View, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import bgImage from "../../../assets/images/bg.jpeg";
import Logo from "../../../assets/images/logo.png";
import { useAppTheme } from "../../../theme/useTheme";
import { ILogin, useLoginForm } from "./useLoginForm";
import TextField from "../../../components/TextField";
import SafeTouchable from "../../../components/SafeTouchable";
import Button from "../../../components/Button";
import { RootStackParamList } from "../../../navigation";
import { SafeAreaContainer } from "../../../components/SafeAreaContainer";
import { useLoginMutation } from "../../../redux/user/userServices";
import { setAuthenticated } from "../../../redux/user";
import { showSnackbar } from "../../../utils/SnackBar";

const initValues: ILogin = {
  email: "eve.holt@reqres.in",
  password: "cityslicka"
};
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function Login(props: Props) {
  const { navigation } = props;
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [login] = useLoginMutation();
  const onSubmit = async (values: ILogin) => {
    try {
      setLoading(true);
      const response = await login(values);

      if (response?.data?.token) {
        dispatch(setAuthenticated({ token: response?.data?.token }));
      }
      if (response?.error?.data) {
        showSnackbar({
          message: response?.error?.data?.error,
          type: "error"
        });
      }
      setLoading(false);
    } catch (error) {
      showSnackbar({
        message: "Something went wrong",
        type: "error"
      });
      setLoading(false);
    }
  };

  const formik = useLoginForm(onSubmit, initValues);
  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleSubmit,
    handleChange
  } = formik;

  const handleSignup = () => navigation.push("Signup");

  return (
    <SafeAreaContainer>
      <ImageBackground resizeMode="cover" source={bgImage} style={styles.root}>
        <View alignItems="center" flex={1} justifyContent="space-around">
          <View
            alignItems="center"
            justifyContent="center"
            px={10}
            width="100%"
          >
            <View flexDirection="row" alignItems="center">
              <Text
                fontWeight="600"
                fontSize={30}
                mr={2}
                color={theme.colors.red[900]}
              >
                Mock
              </Text>
              <Text
                fontWeight="600"
                fontSize={30}
                color={theme.colors.white[900]}
              >
                User
              </Text>
            </View>
            <Text
              alignSelf="center"
              color={theme.colors.white[900]}
              fontSize={16}
              fontWeight="bold"
              mb={2}
              // mt={20}
            >
              Welcome back to Mock User
            </Text>
            <View width="100%">
              <TextField
                autoComplete="email"
                caretHidden={false}
                error={touched.email ? errors.email : ""}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={theme.colors.black[900]}
                returnKeyType="next"
                size="lg"
                style={[
                  styles.inputView,
                  { backgroundColor: theme.colors.white[800] }
                ]}
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
            </View>
            <View mt={3} width="100%">
              <TextField
                autoComplete="password"
                caretHidden={false}
                secureTextEntry
                error={touched.password ? errors.password : ""}
                placeholder="Password"
                placeholderTextColor={theme.colors.black[900]}
                returnKeyType="next"
                size="lg"
                style={[
                  styles.inputView,
                  { backgroundColor: theme.colors.white[800] }
                ]}
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
              />
            </View>
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              mt={5}
              width="100%"
            >
              <Button
                disabled={!isValid}
                loading={loading}
                style={styles.buttonStyle}
                title="LOGIN"
                onPress={handleSubmit}
              />
            </View>
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              mt={10}
            >
              <Text
                color={theme.colors.white[900]}
                fontSize={14}
                fontWeight="400"
                mr={2}
              >
                DON'T HAVE AN ACCOUNT?
              </Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text
                  color={theme.colors.white[900]}
                  fontSize={16}
                  fontWeight="bold"
                >
                  SIGN UP
                </Text>
                <View
                  borderBottomColor={theme.colors.red[900]}
                  borderBottomWidth={2}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View />
        </View>
      </ImageBackground>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get("screen").height,
    width: "100%"
  },
  buttonStyle: {
    height: 45,
    width: "40%"
  },
  inputView: {
    borderRadius: 5
  },
  img: {
    width: 220,
    height: 40
  }
});

export default Login;
