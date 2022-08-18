/**
 * @format
 */
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "./redux/store";

import { ThemeProvider } from "./theme/useTheme";

interface ProvideProps {
  children: JSX.Element | JSX.Element[];
}

function AppProviders(props: ProvideProps) {
  const { children } = props;
  return (
    <ThemeProvider>
      <Provider store={store}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default AppProviders;
