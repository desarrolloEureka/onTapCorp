import React, { useRef } from 'react';
import { View, Text, Switch, Platform } from 'react-native';

const CustomSwitchGeneral = ({
  handleSwitch,
  name,
  checked,
  subindex
}: {
  handleSwitch: (e: any) => void;
  name: string;
  checked?: boolean;
  subindex?: any;
}) => {
  const switchRef = useRef<any>(null);
  const platform = Platform.OS;

  return (
    <View style={{ height: '85%', width: '100%' }}>
      <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {name === 'all_true' && (
          <View style={{ height: '25%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight: '700' }}>
              Compartir Todo
            </Text>
          </View>
        )}

        <View style={{ height: '40%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Switch
            ref={switchRef}
            value={checked}
            key={name}
            onValueChange={() => handleSwitch({ checked, name, subindex })}
            trackColor={{ false: '#030124', true: '#02AF9B' }}
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
        <View style={{ height: name === 'all_true' ? '30%' : '20%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[{ color: '#030124', fontSize: 13 }]}>off/on</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomSwitchGeneral;
