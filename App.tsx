/**
 * @format
 */
import React from "react";
import { Text, TextInput } from "react-native";
import { NativeBaseProvider } from "native-base";

import NavContainer from "./src/navigation";

import { useAppTheme } from "./src/theme/useTheme";
import AppProviders from "./src/AppProvider";

function SubApp() {
  const theme = useAppTheme();

  return (
    <NativeBaseProvider theme={theme}>
      <NavContainer />
    </NativeBaseProvider>
  );
}

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

function App() {
  const disableScaling = () => {
    (Text as unknown as TextWithDefaultProps).defaultProps =
      (Text as unknown as TextWithDefaultProps).defaultProps || {};
    (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
      false;
    (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
      (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
    (
      TextInput as unknown as TextInputWithDefaultProps
    ).defaultProps!.allowFontScaling = false;
  };

  React.useEffect(() => {
    disableScaling();
  }, []);

  return (
    <AppProviders>
      <SubApp />
    </AppProviders>
  );
}

export default App;
