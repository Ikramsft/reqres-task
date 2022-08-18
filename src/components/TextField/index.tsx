import {
  Box,
  FormControl,
  IInputProps,
  Input,
  Text,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';

import {useAppTheme} from '../../theme/useTheme';

interface IRenderInputProps extends IInputProps {
  label?: string;
  error?: string;
  labelStyles?: TextStyle;
  containerStyles?: ViewStyle;
}

const TextField = React.forwardRef<TextInput, IRenderInputProps>(
  (props: IRenderInputProps, ref) => {
    const {error, label, labelStyles, containerStyles, style, ...restProps} =
      props;
    const theme = useAppTheme();
    return (
      <Box alignItems="center" style={containerStyles}>
        <FormControl isInvalid={Boolean(error)}>
          {label ? (
            <Text my={1} style={labelStyles}>
              {label}
            </Text>
          ) : null}
          <Input
            autoCapitalize="none"
            ref={ref}
            style={[styles.input, style]}
            {...restProps}
          />
          {error ? (
            <View flexDirection="row" mt={2} width="100%">
              <WarningOutlineIcon
                size="xs"
                style={[{color: theme.colors.red[600]}, styles.errorIconStyle]}
              />
              <Text color={theme.colors.red[600]}>{error}</Text>
            </View>
          ) : null}
        </FormControl>
      </Box>
    );
  },
);

TextField.defaultProps = {
  label: undefined,
  error: undefined,
  labelStyles: {},
  containerStyles: {},
};

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 0,
  },
  errorIconStyle: {
    marginTop: 5,
    marginRight: 5,
  },
});

export default TextField;
