/**
 * @format
 */
import React from "react";
import { TextStyle, View, StyleSheet } from "react-native";
import { Text } from "native-base";
import { useAppTheme } from "../theme/useTheme";
interface IHeaderTitleProps {
  title?: string;
  LeftElement?: JSX.Element | JSX.Element[] | undefined;
  RightElement?: JSX.Element | JSX.Element[] | undefined;
  render?: JSX.Element | JSX.Element[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleTextProps?: any;
  style?: TextStyle | undefined;
}

function HeaderTitle(props: IHeaderTitleProps) {
  const {
    title,
    LeftElement,
    RightElement,
    render,
    titleTextProps,
    ...others
  } = props;
  const theme = useAppTheme();

  if (render) {
    return <View {...others}>{render}</View>;
  }

  return (
    <View style={styles.container} {...others}>
      {LeftElement}
      <Text
        style={styles.headerTitle}
        {...titleTextProps}
        color={theme.colors.black[900]}
      >
        {title}
      </Text>
      {RightElement}
    </View>
  );
}

HeaderTitle.defaultProps = {
  title: "",
  LeftElement: undefined,
  RightElement: undefined,
  render: undefined,
  titleTextProps: undefined,
  style: undefined
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize"
  }
});
export default HeaderTitle;
