import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GetUser } from '../../../../../../reactQuery/users';
import { RouteStackParamList } from '../../../../../../types/navigation';

type Props = {};

const RoadsHook = (props?: Props) => {
  const {data} = GetUser();

  const navigation =
    useNavigation<StackNavigationProp<RouteStackParamList, 'Home'>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTabPress = (tabName: string) => {
    if (tabName === 'Profile') {
      navigation.navigate('Profile');
    } else if (tabName === 'Meetings') {
      navigation.navigate('Meetings');
    } else if (tabName === 'Roads') {
      navigation.navigate('Roads');
    } else {
      navigation.navigate('Home');
    }
  };
  return {
    user: data,
    handleTabPress,
    handleBackPress
  };
};

export default RoadsHook;
