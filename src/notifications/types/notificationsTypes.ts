export interface Alert {
  body: string;
  title: string;
}

export interface Aps {
  alert: Alert;
  sound: string;
  'thread-id': string;
}

export interface NotificationsData {
  type: string;
  'google.c.fid': string;
  'gcm.message_id': string;
  actionIdentifier: string;
  aps: Aps;
  id_action: string;
  'google.c.a.e': string;
  id_user: string;
  userInteraction: number;
  'google.c.sender.id': string;
  id_pet: string;
  uuid: string;
}
