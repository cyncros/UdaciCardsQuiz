import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFY_KEY = "udacicards:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFY_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

export function createNotification() {
  return {
    title: "🔔 Alert 🔔",
    body: "📖 Dont forget to study today 📖",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFY_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(13);
            tomorrow.setMinutes(30);

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: "day"
              }
            );
            AsyncStorage.setItem(NOTIFY_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
