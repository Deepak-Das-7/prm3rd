import LeadCard from '@/components/lead/LeadCard';
import { Lead } from '@/types/Lead';
import React from 'react';
import { FlatList, StyleSheet, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

async function sendSamplePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Sample Push Notification 📬",
      body: "This is a local push notification triggered from the button.",
      data: { data: 'goes here' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2
    },
  });
}

const DATA: Lead[] = [
  {
    "_id": { "$oid": "693a700924404428bc8b3df7" },
    "status": "new",
    "lead_id": "LEAD0001",
    "lead_name": "Raju Yadav",
    "city": "Sangareddy",
    "customer_mobile": "9391652147",
    "image_url": require("@/assets/images/icon.png")
  },
  {
    "_id": { "$oid": "693a700924404428bc8b3df8" },
    "status": "contacted",
    "lead_id": "LEAD0002",
    "lead_name": "Anjali Sharma",
    "city": "Hyderabad",
    "customer_mobile": "9848022334",
    "image_url": require("@/assets/images/icon.png")
  }
];

export default function LeadsList() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Trigger Demo Push Notification"
          onPress={sendSamplePushNotification}
        />
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item._id.$oid}
        renderItem={({ item }) => <LeadCard item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  listContent: { paddingVertical: 8 },
  buttonContainer: { padding: 16 }
});