import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../types/navigation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const MenuSuperior = ({ setAlertLogOut, setAlertDelte }: { setAlertLogOut: (e: boolean) => void; setAlertDelte: (e: boolean) => void; }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemPress = (item: { id: number; name: string }) => {
    setModalVisible(false);

    if (item.id === 1) {
      Linking.openURL(
        'https://onetap.com.co/categoria-producto/planes-personales/',
      );
    } else if (item.id === 2) {
      Linking.openURL('https://onetap.com.co/plan-corporativo/');
    } else if (item.id === 3) {
      Linking.openURL('https://onetap.com.co/categoria-producto/tarjetas/');
    } else if (item.id === 4) {
      Linking.openURL('https://onetap.com.co/tienda-one-tap/');
    } else if (item.id === 8) {
      Linking.openURL('https://onetap.com.co/reembolso_devoluciones/');
    } else if (item.id === 9) {
      Linking.openURL('https://onetap.com.co/preguntas-frecuentes/');
    } else if (item.id === 5) {
      navigation.navigate('AcercaDe');
    } else if (item.id === 7) {
      navigation.navigate('Terminos');
    } else if (item.id === 6) {
      navigation.navigate('Politicas');
    } else if (item.id === 10) {
      navigation.navigate('ChangePassword');
    } else if (item.id === 11) {
      setAlertDelte(true);
    } else if (item.id === 12) {
      setAlertLogOut(true);
    }
  };

  const renderModalContent = () => {
    const items = [
      { id: 5, name: 'Acerca De', icon: 'information-outline' },
      { id: 6, name: 'Políticas de Privacidad', icon: 'lock' },
      { id: 7, name: 'Términos y Condiciones', icon: 'file-contract' },
      { id: 9, name: 'Preguntas Frecuentes', icon: 'chat-question-outline' },
      { id: 10, name: 'Cambiar Contraseña', icon: 'password' },
      { id: 11, name: 'Eliminar Cuenta', icon: 'deleteuser' },
      { id: 12, name: 'Cerrar Sesión', icon: 'logout' }
    ];

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
        <View style={{ height: '10%', width: '65%', alignItems: 'flex-end', borderTopLeftRadius: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>

          <TouchableOpacity style={{ height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center' }} onPress={toggleModal}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>

        </View>
        <View style={{ height: '90%', width: '65%', justifyContent: 'flex-start', backgroundColor: 'white' }}>
          {items.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)} style={styles.item}>
              <View style={{ height: '100%', width: '7%' }}>
              </View>
              <View style={{ height: '100%', width: '90%', flexDirection: 'row', }}>
                {item.icon === 'shopping-cart' ? <Feather name={item.icon} size={24} color="black" /> : null}
                {item.icon === 'restore' || item.icon === 'storefront-outline' || item.icon === 'information-outline' || item.icon === 'chat-question-outline' ? <MaterialCommunityIcons name={item.icon} size={24} color="black" /> : null}
                {item.icon === 'file-present' || item.icon === 'password' || item.icon === 'logout' ? <MaterialIcons name={item.icon} size={24} color="black" /> : null}
                {item.icon === 'deleteuser' ? <AntDesign name={item.icon} size={24} color="black" /> : null}
                {item.icon === 'lock' ? <SimpleLineIcons name={item.icon} size={23} color="black" /> : null}
                {item.icon === 'file-contract' ? <FontAwesome5 name={item.icon} size={22} color="black" /> : null}
                {item.icon === 'shopping-basket-remove' ? <Fontisto name={item.icon} size={22} color="black" /> : null}
                <Text style={{ color: 'black', paddingLeft: 12 }}> {item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.iconText}>☰</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    marginRight: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconText: {
    fontSize: 30,
    color: '#396593',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
  },
});

export default MenuSuperior;