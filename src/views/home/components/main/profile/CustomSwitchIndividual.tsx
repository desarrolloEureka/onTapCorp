import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  Platform,
  TouchableOpacity,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {profileStyles} from '../../../styles/profileStyles';
import {SendDataIndividualSwitch} from '../../../../../reactQuery/users';

const CustomSwitchIndividual = ({
  item,
  uid,
  selectedArea
}: {
  item: any;
  uid: any;
  selectedArea: any;
}) => {
  const handleSwitchChange = (value: boolean) => {
    SendDataIndividualSwitch(uid, selectedArea, value, item);
  };

  return (
    <View
      style={{
        height: 100,
        justifyContent: 'flex-start',
        flexDirection: 'row'
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          height: '90%',
          width: '76%'
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
            width: '100%',
            paddingLeft: 10
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '20%',
              width: '90%'
            }}>
            <Text style={profileStyles.label}>{item.name}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '55%',
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#9b9db3'
            }}>
            <View
              style={{
                height: '100%',
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Ionicons
                name="document-attach-outline"
                size={28}
                color="#396593"
              />
            </View>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '85%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => Linking.openURL(item.url)}>
              <Text
                style={{
                  height: '50%',
                  width: '95%',
                  fontSize: 15,
                  color: 'black',
                  fontWeight: 'normal'
                }}>
                {item.url}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: '90%',
          width: '24%',
          justifyContent: 'center', // Centrar verticalmente
          alignItems: 'center' // Centrar horizontalmente
        }}>
        <Switch
          value={item.isActiveSwitch}
          onValueChange={handleSwitchChange}
          trackColor={{
            false: '#030124',
            true: '#02AF9B'
          }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          style={{
            transform:
              Platform.OS == 'android'
                ? [{scaleX: 1.3}, {scaleY: 1.3}]
                : [{scaleX: 1}, {scaleY: 1}]
          }}
        />
        <Text style={[{color: '#030124', fontSize: 13, fontWeight: 'normal'}]}>
          off/on
        </Text>
      </View>
    </View>
  );
};

export default CustomSwitchIndividual;
