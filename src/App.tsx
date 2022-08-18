/**
 * @format
 */
import React from "react";
import { NativeBaseProvider } from "native-base";
import NavContainer from "./navigation";
import { useAppTheme } from "./theme/useTheme";
import AppProviders from "./AppProvider";

function App() {
  const theme = useAppTheme();

  return (
    <AppProviders>
      <NativeBaseProvider theme={theme}>
        <NavContainer />
      </NativeBaseProvider>
    </AppProviders>
  );
}

export default App;
