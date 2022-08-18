/**
 * @format
 */
import {Text, Button as NativeButton, IButtonProps} from 'native-base';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useAppTheme} from '../../theme/useTheme';

interface ButtonProps extends IButtonProps {
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
  onPress?: () => void;
}

function Button(props: ButtonProps) {
  const {loading, disabled, loadingText, title, style, onPress, ...rest} =
    props;

  const theme = useAppTheme();

  return (
    <NativeButton
      _loading={{_text: {color: theme.colors.white[900]}}}
      backgroundColor={
        disabled ? theme.colors.gray[900] : theme.colors.red[800]
      }
      isDisabled={disabled}
      isLoading={loading}
      isLoadingText={loadingText}
      style={style}
      onPress={onPress}
      {...rest}>
      <Text color={theme.colors.white[900]} fontSize={15} fontWeight="500">
        {title}
      </Text>
    </NativeButton>
  );
}

Button.defaultProps = {
  disabled: false,
  loading: false,
  loadingText: '',
  style: undefined,
  onPress: undefined,
};

export default Button;
