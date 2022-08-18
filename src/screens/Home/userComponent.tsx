import React from "react";
import { View, Text } from "native-base";
import { Image } from "react-native";

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IUserProps {
  user: IUser;
  theme: any;
}

function UserComponent(props: IUserProps) {
  const { theme, user } = props;
  const { avatar, email, last_name, first_name } = user;
  return (
    <View alignItems="center" padding={4} flexDirection="row">
      <View
        mr={4}
        borderRadius={360}
        borderWidth={2}
        borderColor={theme.colors.gray[500]}
      >
        <Image
          source={{ uri: avatar }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 360,
            margin: 2
          }}
        />
      </View>
      <View>
        <Text fontWeight="600" fontSize={16}>
          {first_name} {last_name}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

export default UserComponent;
