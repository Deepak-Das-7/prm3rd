import { apiResponse } from '@/data/generationData';
import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GenerationGraph = () => {
  const scrollRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current; // New Animated Blink

  const dataPoints = apiResponse?.data?.total?.find(s => s.name === "Actual Power")?.data || [];
  const labels = dataPoints.map((v, i) => (i % 5 === 0 || i === dataPoints.length - 1)
    ? `${new Date(v[0]).getHours().toString().padStart(2, '0')}:00` : "");
  const values = dataPoints.map(v => v[1]);

  useEffect(() => {
    // Sequence for Pulse
    Animated.loop(Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true })).start();

    // Sequence for Blink (Opactiy 1 -> 0.3 -> 1)
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (!dataPoints.length) return <View style={styles.card}><Text>No Data</Text></View>;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Power Generation (Today)</Text>
      <ScrollView horizontal ref={scrollRef} onContentSizeChange={() => scrollRef.current?.scrollToEnd()}>
        <LineChart
          data={{
            labels,
            datasets: [
              { data: values, color: () => `rgba(125, 220, 254, 1)`, strokeWidth: 2 },
              { data: values, color: () => `rgba(33, 150, 243, 1)`, strokeWidth: 0.5 }
            ]
          }}
          width={Dimensions.get('window').width * 2}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero
          renderDotContent={({ x, y, index }) => index === dataPoints.length - 1 && (
            <View key={`last-dot-${index}`} style={{ position: 'absolute', left: x, top: y }}>
              {/* Expanding Ring */}
              <Animated.View style={[styles.ring, {
                transform: [{ scale: pulseAnim }],
                opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] })
              }]} />
              {/* Blinking Center Core */}
              <Animated.View style={[styles.core, { opacity: blinkAnim }]} />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (op = 1) => `rgba(33, 150, 243, ${op})`,
  labelColor: (op = 1) => `rgba(100, 100, 100, ${op})`,
  fillShadowGradient: "#2196F3", // Fixed from red to blue for consistency
  fillShadowGradientOpacity: 0.1,
  propsForBackgroundLines: { stroke: "#F5F5F5" }
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, margin: 10, elevation: 4, shadowColor: '#2196F3', shadowOpacity: 0.15, shadowRadius: 8 },
  title: { fontSize: 12, fontWeight: '700', color: '#999', textTransform: 'uppercase', marginBottom: 10 },
  ring: { position: 'absolute', width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: '#2196F3', left: -15, top: -15 },
  core: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#2196F3', borderWidth: 1, borderColor: '#FFF', left: -4, top: -4 }
});

export default GenerationGraph;