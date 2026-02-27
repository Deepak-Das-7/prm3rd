import LeadCard from '@/components/lead/LeadCard';
import { Colors } from '@/constants/colors';
import { Lead } from '@/types/Lead';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DATA: Lead[] = [
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
            <FlatList
                data={DATA}
                keyExtractor={(item) => item._id.$oid}
                renderItem={({ item }) => <LeadCard item={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray300 },
});