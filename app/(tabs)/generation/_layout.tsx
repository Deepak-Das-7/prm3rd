import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: Colors.gray300 },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Generation',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Generation Details',
          headerShown: true,
        }}
      />
    </Stack>
  );
}