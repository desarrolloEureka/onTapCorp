/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {
  pushConfigure,
  remoteMessageAction,
} from './src/notifications/notificationsHook';

AppRegistry.registerComponent(appName, () => {
  pushConfigure();
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    remoteMessageAction(remoteMessage);
  });
  return App;
});
