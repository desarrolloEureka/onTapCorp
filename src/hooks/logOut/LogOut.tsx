import {useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../types/navigation';

const logOut = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  const logOut = async () => {
    try {
      // Borra todas las queries almacenadas y luego reinicia las queries relacionadas con 'user'
      await queryClient.clear();
      await queryClient.invalidateQueries({queryKey: ['user']});
      await queryClient.resetQueries({queryKey: ['user']});
      queryClient.removeQueries(); // Elimina todas las queries de la cache

      // Borra todos los datos de AsyncStorage
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.clear();

      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}]
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return {logOut};
};

export default logOut;
