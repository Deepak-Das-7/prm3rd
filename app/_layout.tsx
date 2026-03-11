import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { usePushNotifications } from '@/hooks/usePushNotifications';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications();

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
