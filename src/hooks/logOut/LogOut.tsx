import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../types/navigation';

const logOut = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  const logOut = async () => {
    await AsyncStorage.clear();
    await queryClient.clear();
    navigation.navigate('Login');
  };
  return { logOut };
};

export default logOut;