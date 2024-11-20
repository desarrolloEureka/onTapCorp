import React, { useEffect, useState } from 'react';
import { Switch, View, Platform } from 'react-native';
import { GetUser, SendSwitchActivateCard } from '../../../../../reactQuery/users';

const CustomSwitch = ({
  uid,
  setAlertSwitchOff
}: {
  uid?: string;
  setAlertSwitchOff: (e: boolean) => void;
}) => {
  const { data } = GetUser();
  const [switchCard, setSwitchCard] = useState(false);
  const platform = Platform.OS;

  const handleSwitchChange = async () => {
    setSwitchCard(!switchCard);
    if (uid) {
      SendSwitchActivateCard(uid, !switchCard);

      if (!switchCard === false) {
        setAlertSwitchOff(true);
      }
    }
  }

  useEffect(() => {
    if (data) {
      setSwitchCard(data.switch_activateCard);
    }
  }, [data])


  return (
    <View>
      <Switch
        value={switchCard}
        onValueChange={handleSwitchChange}
        trackColor={{ false: '#030124', true: '#396593' }}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        style={{
          transform:
            platform == 'android'
              ? [{ scaleX: 1.3 }, { scaleY: 1.3 }]
              : [{ scaleX: 1 }, { scaleY: 1 }]
        }}
      />
    </View>
  );
};

export default CustomSwitch;