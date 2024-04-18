import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { profileStyles } from '../../../styles/profileStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ItemFormParams } from '../../../../../types/profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSwitchGeneral from './CustomSwitchGeneral';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ItemForm = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  switchAction,
  icon,
  handleModalAlert,
  myValue,
  index,
  subindex,
}: ItemFormParams) => {
  const dataRef = useRef<any>(null);
  const [inputText, setInputText] = useState('');

  const value = () => {
    if (
      index != 'urlsCompany' &&
      index != 'urlsCommercial'
    ) {
      return dataRef?.current?.text ?? myValue?.text;
    } else {
      if (dataRef.current && dataRef.current.length) {
        return dataRef?.current[subindex as any]?.text;
      }
    }
  };

  useEffect(() => {
    if (dataRef.current && myValue) {
      dataRef.current = myValue;
      value();
    }
  }, [dataRef, myValue, inputText]);

  console.log("label ",label);
  return (
    <View style={{ height: 100, justifyContent: 'center', flexDirection: 'row' }}>

      <View style={{ flexDirection: 'column', alignItems: 'center', height: '90%', width: '85%' }}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', height: '100%', width: '100%', paddingLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: '20%', width: '90%' }}>
            <Text style={profileStyles.label}>{label}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', height: '55%', width: '90%', borderBottomWidth: 1, borderBottomColor: '#9b9db3', }}>
            {icon === 'PersonOutlinedIcon' ? (
              <View style={{ height: '100%', width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="person-outline" size={28} color="#396593" />
              </View>
            ) : icon === 'document-attach-outline' ? (
              <View
                style={{
                  height: '100%',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="document-attach-outline" size={28} color="#396593" />
              </View>
            ) : icon === 'bag-outline' ? (
              <View
                style={{
                  height: '100%',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="bag-outline" size={28} color="#396593" />
              </View>
            ) : icon === 'phone' ? (
              <View
                style={{
                  height: '100%',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="phone" size={28} color="#396593" />
              </View>
            ) : null}

            <View style={{ height: '100%', width: '85%', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                ref={dataRef}
                id={`${name}-input`}
                keyboardType={name === 'phone' ? 'numeric' : 'default'}
                style={profileStyles.inputBox}
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                maxLength={name === 'phone' ? 10 : undefined}
                onChangeText={(text: any) => {
                  setInputText(text);
                  handleData({
                    name: name,
                    text: text,
                    currentDataRef: dataRef,
                    key: subindex,
                  });
                }}
                value={
                  myValue && !Array.isArray(myValue)
                    ? myValue?.text
                    : myValue && myValue[subindex as number]?.text
                }
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'center', height: '100%', width: '15%' }}>
        {switchAction === true && (
          <CustomSwitchGeneral
            name={name}
            subindex={subindex}
            handleSwitch={(e: any) => handleSwitch({ checked, name, subindex })}
            checked={checked}
          />
        )}
      </View>

    </View>
  );
};

export default ItemForm;