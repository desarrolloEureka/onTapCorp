import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {GetUser} from '../../../../../reactQuery/users';
import {useRoute} from '@react-navigation/native';

const PreviewTemplate = () => {
  const navigation = useNavigation();
  const {data} = GetUser();
  const route = useRoute();
  const [template, setTemplate] = useState('template');

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const isProUser = route.params && route?.params?.template;
    if (isProUser !== undefined) {
      setTemplate(isProUser);
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

        <View style={{height: '100%', width: '100%'}}>
          {data && data?.uid && (
            <WebView
              source={{
                uri: `https://one-tap-corp-dev.vercel.app/components/views/cardView/?uid=${data.uid}&platform=${template}`
              }}
              style={{flex: 1}}
              scalesPageToFit
              useWebKit={true}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PreviewTemplate;
