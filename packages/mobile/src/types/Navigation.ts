import type {StackNavigationProp} from '@react-navigation/stack';
import type {ParamListBase, RouteProp} from '@react-navigation/native';

// Note: We don't use that in the RN testing course
//
// type NestedNavigatorParams<ParamList> = {
//   [K in keyof ParamList]: undefined extends ParamList[K]
//     ? {screen: K; params?: ParamList[K]}
//     : {screen: K; params: ParamList[K]};
// }[keyof ParamList];

/**
 * Tracks the route params that are able to be passed along with the navigate()
 * function
 * e.g. this.props.navigation.navigate('SignUp', { email })
 */
export type PreAuthStackParamList = {
  SignUp: undefined;
};

/**
 * Tracks the route params that are able to be passed along with the navigate()
 * function
 * e.g. this.props.navigation.navigate('Home', { userId })
 */
export type MainStackParamList = {
  Home: undefined;
};

export type MainStackRoutes = keyof MainStackParamList;

export type StackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> = {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

/**
 * Use by passing the current stack screen name as a generic.
 * e.g. PreAuthNavProps<"SignUp">
 */
export type PreAuthNavProps<
  ScreenName extends keyof PreAuthStackParamList = 'SignUp',
> = StackScreenProps<PreAuthStackParamList, ScreenName>;

/**
 * Use by passing the current stack screen name as a generic.
 * e.g. NavProps<"Profile">
 */
export type NavProps<ScreenName extends MainStackRoutes = 'Home'> =
  StackScreenProps<MainStackParamList, ScreenName>;
