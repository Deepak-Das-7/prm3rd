import { Colors } from '@/constants/colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color }) => <Octicons size={28} name="project-roadmap" color={color} />,
        }}
      />
      <Tabs.Screen
        name="generation"
        options={{
          title: 'Generation',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="solar-power-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="o&m"
        options={{
          title: 'O&M',
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="tools" color={color} />,
        }}
      />
    </Tabs>
  );
}
