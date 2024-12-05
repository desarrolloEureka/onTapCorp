import {Platform, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const updateTokenFcm = async (newToken: string) => {
  const token = await AsyncStorage.getItem('@fcmToken');
  console.log('Token--> ',token);
  token != null
    ? newToken !== token && AsyncStorage.setItem('@fcmToken', newToken)
    : AsyncStorage.setItem('@fcmToken', newToken);
};

export const requestUserPermissionFb = async () => {
  let newToken = null;
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging()
        .getAPNSToken()
        .then(async apnsToken => {
          if (apnsToken) {
            newToken = await messaging().getToken();
            console.log('newToken', newToken);

            updateTokenFcm(newToken);
          } else {
            console.warn('APNS Token not available');
          }
        });
    } else {
      console.log('permission denied');
    }
  } else if (Platform.OS === 'android') {
    //Request Android permission (For API level 33+, for 32 or below is not required)
    const res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    const isGranted = async () => {
      newToken = await messaging().getToken();
      console.log('Toke.. ', newToken);
      updateTokenFcm(newToken);
    };

    if (res == 'granted') {
      isGranted();
    } else if (res == 'denied') {
      requestUserPermissionFb();
    } else {
      isGranted();
    }
  }
  return newToken;
};
