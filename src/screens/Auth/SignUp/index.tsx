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
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import bgImage from "../../../assets/images/bg.jpeg";
import { useAppTheme } from "../../../theme/useTheme";
import { ISignUp, useSignupForm } from "./useSignupForm";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import { SafeAreaContainer } from "../../../components/SafeAreaContainer";
import { useRegisterMutation } from "../../../redux/user/userServices";
import { setAuthenticated } from "../../../redux/user";
import { RootStackParamList } from "../../../navigation";
import { showSnackbar } from "../../../utils/SnackBar";

const initValues: ISignUp = {
  email: "",
  password: "",
  confirmPassword: ""
};
type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

function Signup(props: Props) {
  const { navigation } = props;
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [register] = useRegisterMutation();
  const onSubmit = async (values: ISignUp) => {
    try {
      setLoading(true);
      const response = await register(values);

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

  const formik = useSignupForm(onSubmit, initValues);
  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleSubmit,
    handleChange
  } = formik;
  const handleLogin = () => navigation.goBack();

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
            <View mt={3} width="100%">
              <TextField
                autoComplete="password"
                caretHidden={false}
                secureTextEntry
                error={touched.confirmPassword ? errors.confirmPassword : ""}
                placeholder="Confirm Password"
                placeholderTextColor={theme.colors.black[900]}
                returnKeyType="next"
                size="lg"
                style={[
                  styles.inputView,
                  { backgroundColor: theme.colors.white[800] }
                ]}
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
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
                title="SIGN UP"
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
                ALREADY HAVE ACCOUNT?
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text
                  color={theme.colors.white[900]}
                  fontSize={16}
                  fontWeight="bold"
                >
                  LOGIN
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

export default Signup;
