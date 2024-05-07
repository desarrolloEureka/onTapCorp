import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {GetUser} from '../../../../../reactQuery/users';
import {domain} from '../../../../../initialData/globals';
import {useRoute} from '@react-navigation/native';

const PreviewTemplate = () => {
  const navigation = useNavigation();
  const {data} = GetUser();
  const route = useRoute();
  const [tab, setTab] = useState('social');

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const isProUser = route.params && route?.params?.tab;
    if (isProUser !== undefined) {
      setTab(isProUser);
    }
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={require('../../../../../images/background.png')}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
            borderRadius: 100,
            position: 'absolute',
            top: 50,
            left: 10,
            zIndex: 9999999999,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
          onPress={handleBackPress}>
          <Icon name="arrow-back-ios" size={28} color="white" />
        </TouchableOpacity>

        <View style={{height: '15%'}}></View>
        <View
          style={{
            // height: '100%',
            // width: '100%',
            //*/->Temporal
            height: '80%',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'flex-end',
            borderRadius: 50
          }}>
          {/* Temporal */}
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={require('../../../../../images/corporativa.png')}
          />
          {/* {data && data?.uid && (
          <WebView
            source={{
              uri: `https://backoffice.onetap.com.co/es/views/cardView?uid=${data.uid}&type=${tab}`
            }}
            style={{flex: 1}}
            scalesPageToFit
            useWebKit={true}
          />
        )} */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PreviewTemplate;
