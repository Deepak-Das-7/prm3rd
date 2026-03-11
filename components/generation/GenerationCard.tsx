import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface GenerationCardProps {
    item: {
        mtd_kwhkwp_status: string;
        grid_status: string;
        cluster: string;
        alert: number;
        stored_at: number;
        ac_capacity: string;
        mtd_kwhkwp: string;
        alarm: number;
        state: string;
        city: string;
        dc_capacity: string;
        hub: string;
        yes_kwhkwp_status: string;
        latitude: string;
        warning: number;
        city_rsc: string;
        plant_name: string;
        yes_kwhkwp: string;
        timestamp: number;
        inverter_make: string;
        customer_id: string;
        zone: string;
        address: string;
        communication_status: string;
        plant_health: string;
        pv_power: string;
        energy_efficiency: string;
        satellite: string;
        cod_status: string;
        district: string;
        kwhkwp: string;
        ac_power: string;
        events: any[];
        module_make: string;
        longitude: string;
        generation_health: string;
        today_energy: string;
        server_timestamp: number;
        project_id: number;
        custom_field: {
            Cluster: string;
            Satellite: string;
            Hub: string;
            "City RSC": string;
            "Plant COD": string;
        };
        portal_alert: number;
        plant_status: string;
        site_id: number;
    }
}
const GenerationCard = ({ item }: GenerationCardProps) => {
    // Helper function to get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'green':
                return '#4CAF50';
            case 'blue':
                return '#2196F3';
            case 'yellow':
                return '#FFC107';
            case 'red':
                return '#F44336';
            default:
                return '#999999';
        }
    };

    return (
        <View style={styles.card}>
            {/* Header with Plant Name and Status */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.plantName}>{item.plant_name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.plant_status) }]}>
                        <Text style={styles.statusText}>{item.plant_status}</Text>
                    </View>
                </View>
                <Text style={styles.location}>{item.city}, {item.district}</Text>
            </View>

            {/* Main Power Generation Stats */}
            <View style={styles.mainStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>AC Power</Text>
                    <Text style={styles.statValue}>{item.ac_power} kW</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Todays Energy</Text>
                    <Text style={styles.statValue}>{item.today_energy} kWh</Text>
                </View>
            </View>

            {/* Key Performance Indicators */}
            <View style={styles.kpiContainer}>
                <View style={styles.kpiItem}>
                    <Text style={styles.kpiLabel}>KWh/KWp</Text>
                    <Text style={styles.kpiValue}>{item.kwhkwp}</Text>
                </View>

                <View style={styles.kpiItem}>
                    <Text style={styles.kpiLabel}>MTD KWh/KWp</Text>
                    <View style={styles.kpiWithStatus}>
                        <Text style={styles.kpiValue}>{item.mtd_kwhkwp}</Text>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.mtd_kwhkwp_status) }]} />
                    </View>
                </View>

                <View style={styles.kpiItem}>
                    <Text style={styles.kpiLabel}>Efficiency</Text>
                    <Text style={styles.kpiValue}>{item.energy_efficiency}</Text>
                </View>
            </View>

            {/* Basic System Info */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Inverter</Text>
                    <Text style={styles.footerValue}>{item.inverter_make}</Text>
                </View>

                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Status</Text>
                    <View style={styles.communicationStatus}>
                        <View style={[styles.statusDot, { backgroundColor: item.communication_status === 'online' ? '#4CAF50' : '#F44336' }]} />
                        <Text style={styles.footerValue}>{item.communication_status}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GenerationCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        marginBottom: 16,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    plantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    location: {
        fontSize: 14,
        color: '#666666',
    },
    mainStats: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#DDDDDD',
        marginHorizontal: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    kpiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    kpiItem: {
        alignItems: 'center',
    },
    kpiLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 2,
    },
    kpiValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    kpiWithStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerItem: {
        flex: 1,
    },
    footerLabel: {
        fontSize: 11,
        color: '#999999',
        marginBottom: 2,
    },
    footerValue: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
    },
    communicationStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})