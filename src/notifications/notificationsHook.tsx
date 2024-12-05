import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {NotificationsData} from './types/notificationsTypes';

export const pushConfigure = () => {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.debug('TOKEN::::::::::', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.debug('NOTIFICATION:', JSON.stringify(notification));
      const currentData = notification.data as NotificationsData;
      const currentDataData = {
        aps: {
          alert: {
            body: currentData.aps.alert.body,
            title: currentData.aps.alert.title
          }
        }
      };
      if (Platform.OS == 'ios') {
        // const notificationData:ValidateNotificationsData = {aps:{alert: {body: notification.data.aps.alert} }}
        // process the notification
        // PushNotificationsActions(data);
      }
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.debug('ACTION:', notification.action);
      console.debug('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true
  });

  // PushNotification.popInitialNotification(notification => {
  //   console.log('Initial Notification', notification);
  // });
};

export const remoteMessageAction = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  if (
    Platform.OS == 'android' &&
    remoteMessage.notification &&
    remoteMessage.data
  ) {
    const currentData = {
      aps: {
        alert: {
          body: remoteMessage.notification?.body,
          title: remoteMessage.notification?.title
        }
      }
    };
    // process the notification
    // PushNotificationsActions(data);
  }
};

export const localNotificationHandle = ({
  title,
  message
}: {
  title: string;
  message: string;
}) => {
  PushNotification.localNotification({
    message,
    title
  });
};
