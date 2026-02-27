import { Colors, getStatusColors } from '@/constants/colors';
import { Lead } from '@/types/Lead';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface LeadCardProps {
    item: Lead;
}

const LeadCard = ({ item }: LeadCardProps) => {
    const statusColors = getStatusColors(item.status);
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/leads/[id]',
            params: { id: item.lead_id },
        });
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressedCard
            ]}
        >
            <View style={styles.row}>
                <Image source={{ uri: String(item.image_url) }} style={styles.avatar} />

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.customerName}>{item.lead_name}</Text>

                            <View style={styles.infoRow}>
                                <Text style={styles.leadName}>{item.lead_name}</Text>
                                <Text style={styles.leadId}>({item.lead_id})</Text>
                            </View>
                        </View>

                        <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
                            <Text style={[styles.statusText, { color: statusColors.text }]}>
                                {item.status.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.gray200,
        padding: 10,
        marginHorizontal: 7,
        marginVertical: 3,
        borderRadius: 5,
        elevation: 2,
        shadowColor: Colors.gray400,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
    },
    pressedCard: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.overlay },
    content: { flex: 1, marginLeft: 12 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    customerName: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
    leadName: { fontSize: 12, fontWeight: '600', color: Colors.info },
    leadId: { fontSize: 11, color: Colors.gray500 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 10, fontWeight: 'bold' },
});

export default LeadCard;