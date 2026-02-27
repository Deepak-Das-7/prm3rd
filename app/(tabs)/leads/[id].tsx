import { Colors } from '@/constants/colors';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DATA } from '.';
import { Lead } from '@/types/Lead';
import { Ionicons } from '@expo/vector-icons'; // Ensure icons are available

export default function LeadDetails() {
    const { id } = useLocalSearchParams();
    const leadData: Lead = DATA.find(l => l.lead_id === id) || DATA[0]; // Fallback to first lead if not found

    if (!leadData) return <Text>Lead not found</Text>;

    const makeCall = () => Linking.openURL(`tel:${leadData.customer_mobile}`);
    const sendWhatsApp = () => Linking.openURL(`whatsapp://send?phone=${leadData.customer_mobile}`);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: leadData.lead_name || 'Lead Details',
                headerShown: true,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#FFF' }
            }} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                {/* Profile Header */}
                <View style={styles.headerCard}>
                    <View style={styles.avatarContainer}>
                        <Image source={leadData.image_url} style={styles.avatar} />
                        <View style={[styles.statusDot, { backgroundColor: leadData.status === 'new' ? '#4CAF50' : '#2196F3' }]} />
                    </View>
                    <Text style={styles.name}>{leadData.lead_name}</Text>
                    <Text style={styles.locationText}>
                        <Ionicons name="location-outline" size={14} /> {leadData.city}
                    </Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={makeCall}>
                        <Ionicons name="call" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.waButton]} onPress={sendWhatsApp}>
                        <Ionicons name="logo-whatsapp" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>WhatsApp</Text>
                    </TouchableOpacity>
                </View>

                {/* Information Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>General Information</Text>

                    <DetailItem icon="finger-print-outline" label="Lead ID" value={leadData.lead_id} />
                    <DetailItem icon="business-outline" label="City" value={leadData.city} />
                    <DetailItem icon="phone-portrait-outline" label="Mobile" value={leadData.customer_mobile} />
                    <DetailItem icon="time-outline" label="Current Status" value={leadData.status.toUpperCase()} isLast />
                </View>

                <View style={[styles.infoSection, { marginTop: 20 }]}>
                    <Text style={styles.sectionTitle}>System Details</Text>
                    <DetailItem icon="key-outline" label="Internal ID" value={leadData._id.toString()} isLast />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const DetailItem = ({ icon, label, value, isLast }: { icon: any, label: string, value: string, isLast?: boolean }) => (
    <View style={[styles.detailRow, isLast && { borderBottomWidth: 0 }]}>
        <View style={styles.labelContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={18} color={Colors.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { padding: 20 },
    headerCard: {
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 25,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    statusDot: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    name: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
    locationText: { fontSize: 16, color: '#777', marginTop: 4 },

    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    callButton: { backgroundColor: Colors.primary },
    waButton: { backgroundColor: '#25D366' },
    actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

    infoSection: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#BBB',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 15,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F0F4FF', // Light tint of primary
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: { color: '#444', fontSize: 15, fontWeight: '500' },
    value: { color: '#1A1A1A', fontSize: 15, fontWeight: '700' },
});