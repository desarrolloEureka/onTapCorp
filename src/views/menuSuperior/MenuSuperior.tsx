import React, {useState} from 'react';
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {StackNavigation} from '../../types/navigation';

const MenuSuperior = ({
  setAlertLogOut,
  setAlertDelte
}: {
  setAlertLogOut: (e: boolean) => void;
  setAlertDelte: (e: boolean) => void;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemPress = (item: {id: number; name: string}) => {
    setModalVisible(false);

    if (item.id === 1) {
      Linking.openURL(
        'https://onetap.com.co/categoria-producto/planes-personales/'
      );
    } else if (item.id === 2) {
      Linking.openURL('https://onetap.com.co/plan-corporativo/');
    } else if (item.id === 3) {
      Linking.openURL('https://onetap.com.co/categoria-producto/tarjetas/');
    } else if (item.id === 4) {
      Linking.openURL('https://onetap.com.co/tienda-one-tap/');
    } else if (item.id === 8) {
      Linking.openURL('https://onetap.com.co/reembolso_devoluciones/');
    } else if (item.id === 10) {
      Linking.openURL('https://onetap.com.co/preguntas-frecuentes/');
    } else if (item.id === 5) {
      navigation.navigate('Templates');
    } else if (item.id === 6) {
      navigation.navigate('AcercaDe');
    } else if (item.id === 7) {
      Linking.openURL(
        'https://drive.google.com/file/d/1Pep9caUKKKFliEeLbAEwWlOCCROUy670/view'
      );
    } else if (item.id === 9) {
      Linking.openURL(
        'https://drive.google.com/file/d/1PSeTFOOG34BRrsoRGfcpQG72AurIc4ll/view'
      );
    } else if (item.id === 11) {
      navigation.navigate('ChangePassword');
    } else if (item.id === 12) {
      setAlertDelte(true);
    } else if (item.id === 13) {
      setAlertLogOut(true);
    }
  };

  const renderModalContent = () => {
    const items = [
      // {id: 5, name: 'Documentos', icon: 'newspaper'},
      {id: 5, name: 'Plantillas', icon: 'newspaper'},
      {id: 6, name: 'Acerca De', icon: 'information-outline'},
      {id: 7, name: 'Políticas de Privacidad', icon: 'lock'},
      {id: 9, name: 'Términos y Condiciones', icon: 'file-contract'},
      {id: 10, name: 'Preguntas Frecuentes', icon: 'chat-question-outline'},
      {id: 11, name: 'Cambiar Contraseña', icon: 'password'},
      {id: 12, name: 'Eliminar Cuenta', icon: 'deleteuser'},
      {id: 13, name: 'Cerrar Sesión', icon: 'logout'}
    ];

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(128, 128, 128, 0.5)'
        }}>
        <View
          style={{
            height: '7%',
            width: '90%',
            alignItems: 'flex-end',
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={toggleModal}>
            <AntDesign name={'close'} size={30} color="#396593" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13
          }}>
          <View
            style={{
              width: '90%',
              paddingBottom: 25,
              backgroundColor: 'white'
            }}>
            {items.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleItemPress(item)}
                style={styles.item}>
                <View style={{height: '100%', width: '7%'}} />
                <View
                  style={{
                    height: '100%',
                    width: '90%',
                    flexDirection: 'row'
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '15%'
                    }}>
                    {item.icon === 'shopping-cart' ? (
                      <Feather name={item.icon} size={26} color="black" />
                    ) : null}
                    {item.icon === 'restore' ||
                    item.icon === 'storefront-outline' ||
                    item.icon === 'information-outline' ||
                    item.icon === 'chat-question-outline' ? (
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={26}
                        color="black"
                      />
                    ) : null}
                    {item.icon === 'file-present' ||
                    item.icon === 'password' ||
                    item.icon === 'logout' ? (
                      <MaterialIcons name={item.icon} size={26} color="black" />
                    ) : null}
                    {item.icon === 'deleteuser' ? (
                      <AntDesign name={item.icon} size={26} color="black" />
                    ) : null}
                    {item.icon === 'lock' ? (
                      <SimpleLineIcons
                        name={item.icon}
                        size={25}
                        color="black"
                      />
                    ) : null}
                    {item.icon === 'file-contract' ? (
                      <FontAwesome5 name={item.icon} size={24} color="black" />
                    ) : null}
                    {item.icon === 'shopping-basket-remove' ? (
                      <Fontisto name={item.icon} size={24} color="black" />
                    ) : null}
                    {item.icon === 'newspaper' ? (
                      <Ionicons name={item.icon} size={24} color="black" />
                    ) : null}
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '85%'
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'normal',
                        textAlign: 'left'
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.iconText}>☰</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    marginRight: 10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  iconText: {
    fontSize: 30,
    color: '#396593'
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    flexDirection: 'row'
  }
});

export default MenuSuperior;
