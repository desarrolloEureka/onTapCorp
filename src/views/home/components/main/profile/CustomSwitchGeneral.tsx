import React, {useRef, useState} from 'react';
import {View, Text, Switch, Platform} from 'react-native';
import {SendDataAllSwitch} from '../../../../../reactQuery/users';

const CustomSwitchGeneral = ({
  uid,
  selectedArea
}: {
  uid: any;
  selectedArea: any;
}) => {
  const platform = Platform.OS;
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = (value: boolean) => {
    setIsActive(value);
    SendDataAllSwitch(uid, selectedArea, value);
  };

  return (
    <View style={{height: '85%', width: '100%'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View
          style={{
            height: '25%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: 'black', fontWeight: '700'}}>
            Compartir Todo
          </Text>
        </View>

        <View
          style={{
            height: '40%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Switch
            value={isActive}
            onValueChange={handleSwitchChange}
            trackColor={{false: '#030124', true: '#02AF9B'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            style={{
              transform:
                platform == 'android'
                  ? [{scaleX: 1.3}, {scaleY: 1.3}]
                  : [{scaleX: 1}, {scaleY: 1}]
            }}
          />
        </View>
        <View
          style={{
            height: '30%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={[{color: '#030124', fontSize: 13, fontWeight: 'normal'}]}>
            off/on
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomSwitchGeneral;
