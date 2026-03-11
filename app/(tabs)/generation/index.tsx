import React from 'react';
import { FlatList, StyleSheet, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import GenerationCard from '@/components/generation/GenerationCard';
import { DATA } from '@/data/sampleDataFromUser';

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



export default function GenerationList() {
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
                renderItem={({ item }) => <GenerationCard item={item} />}
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