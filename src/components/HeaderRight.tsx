/**
 * @format
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAppTheme } from "../theme/useTheme";
import SafeTouchable from "./SafeTouchable";

interface IHeaderLeftProps {
  onPress?: () => void;
}

function HeaderLeft(props: IHeaderLeftProps) {
  const { onPress } = props;
  const theme = useAppTheme();

  return (
    <SafeTouchable activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <Feather name="log-out" size={20} color={theme.colors.gray[500]} />
      </View>
    </SafeTouchable>
  );
}

HeaderLeft.defaultProps = {
  onPress: null
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    flexDirection: "row",
    width: 35
  }
});

export default HeaderLeft;
