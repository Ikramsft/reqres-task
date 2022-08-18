/**
 * @format
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, View } from "native-base";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/HeaderTitle";
import { RootStackParamList } from "../../navigation";
import { userLogout } from "../../redux/user";
import {
  useLazyFetchUsersQuery,
  userApi,
  usersAdapter,
  usersSelectors
} from "../../redux/user/userServices";
import { useAppTheme } from "../../theme/useTheme";
import UserComponent from "./userComponent";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function Home(props: Props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const theme = useAppTheme();
  let currentPage = 1;

  React.useLayoutEffect(() => {
    const headerLeft = () => <HeaderLeft />;
    const headerRight = () => (
      <HeaderRight onPress={() => dispatch(userLogout())} />
    );
    const headerTitle = () => <HeaderTitle title="Contacts" />;
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerTitle,
      headerLeft,
      headerRight
    });
  }, [navigation]);

  const [fetchPosts, { isFetching }] = useLazyFetchUsersQuery();

  const { users, hasMorePages } = userApi.endpoints.fetchUsers.useQueryState(
    1,
    {
      selectFromResult: (result) => {
        return {
          hasMorePages: result.data?.hasMorePages,
          users: usersSelectors.selectAll(
            result.data ?? usersAdapter.getInitialState()
          )
        };
      }
    }
  );

  const fetchFirstPage = async () => {
    await fetchPosts(currentPage);
  };

  const fetchMorePosts = async () => {
    if (!hasMorePages || isFetching) return;
    currentPage += 1;
    await fetchPosts(currentPage);
  };

  useEffect(() => {
    fetchFirstPage();
  }, []);

  return (
    <View flex={1} p={2} bg={theme.colors.white[900]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => {
          return <UserComponent user={item} theme={theme} />;
        }}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default Home;
