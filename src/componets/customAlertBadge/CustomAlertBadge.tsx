import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomAlertBadge = (
  { isOpen,
    handleAlertSwitch
  }:
    {
      isOpen: boolean,
      handleAlertSwitch: (e: boolean) => void;
    }
) => {
  return isOpen === true && (
    <View style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
      <View style={{ height: '33%', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <View style={{ height: '42%', width: '65%', justifyContent: 'center', alignItems: 'flex-start' }}>
          <View style={{ height: '100%', width: '95%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>

            <View style={{ height: '85%', width: '90%' }}>
              <View style={{ height: '40%', width: '100%', flexDirection: 'row' }}>

                <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                  <Ionicons name="alert-circle-sharp" size={25} color='#396593' />
                </View>
                <TouchableOpacity style={{ height: '100%', width: '50%', alignItems: 'flex-end', justifyContent: 'flex-start' }} onPress={() => handleAlertSwitch(false)}>
                  <Ionicons name="close" size={25} color='#9C9C9C' />
                </TouchableOpacity>
              </View>

              <View style={{ height: '60%', width: '100%' }}>
                <Text style={{ fontSize: 12, color: '#000000' }}>
                  Acabas de desactivar tu tarjeta, por ende nadie podrá ver tu perfil hasta que vuelvas a activarla.
                </Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>
  )
}

export default CustomAlertBadge;