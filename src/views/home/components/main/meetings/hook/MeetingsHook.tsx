import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GetUser } from '../../../../../../reactQuery/users';
import { RouteStackParamList } from '../../../../../../types/navigation';
import { useState } from 'react';

type Props = {};

const MeetingsHook = (props?: Props) => {
  const { data } = GetUser();
  
  const [activeTab, setActiveTab] = useState('tab1');
  const [searchText, setSearchText] = useState('');

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
    } else if (tabName === 'ShareQR') {
      navigation.navigate('ShareQR');
    } else {
      navigation.navigate('Home');
    }
  };
  
  return {
    user: data,
    handleTabPress,
    handleBackPress,
    activeTab,
    setActiveTab,
    searchText,
    setSearchText
  };
};

export default MeetingsHook;
