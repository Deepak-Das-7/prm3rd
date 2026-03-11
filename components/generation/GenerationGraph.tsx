import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GenerationGraph = ({ rawData }) => {
    // 1. Get Actual Power Data
    const actualPowerEntry = rawData.total.find(s => s.name === "Actual Power");
    const dataPoints = actualPowerEntry ? actualPowerEntry.data : [];

    // 2. Format Labels & Data
    // We filter labels to show them every 1 hour (every 4th point since data is every 15 mins)
    const labels = dataPoints.map((item, index) => {
        if (index % 4 === 0 || index === dataPoints.length - 1) {
            const date = new Date(item[0]);
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
        return "";
    });

    const values = dataPoints.map(item => item[1]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Primary Blue
                strokeWidth: 3,
            }
        ],
        legend: ["Actual Power (kW)"]
    };

    return (
        <View style={styles.graphCard}>
            <Text style={styles.sectionTitle}>Power Generation (Today)</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width * 1.6} // Wider for smooth scrolling
                    height={220}
                    chartConfig={chartConfig}
                    bezier // Smooth curves
                    style={styles.chartStyle}
                    fromZero
                    segments={5}
                />
            </ScrollView>
        </View>
    );
};

const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
    propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#2196F3"
    },
    propsForBackgroundLines: {
        strokeDasharray: "", // solid background lines
        stroke: "#F0F0F0"
    }
};

const styles = StyleSheet.create({
    graphCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#BBB',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 15,
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
        paddingRight: 40, // Space for the last label
    }
});

export default GenerationGraph;