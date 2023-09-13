import * as React from "react";
import notifee from '@notifee/react-native';


export default async function Notification(notifiMessage : any) {

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification({
    title: notifiMessage.title,
    body: notifiMessage.body,
    android: {
      channelId : channelId,
    },
  });

}



