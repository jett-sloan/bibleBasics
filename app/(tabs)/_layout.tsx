import React from 'react';
import { Image } from 'react-native';
import { Stack, Tabs } from 'expo-router';
import { useColorScheme } from '../../components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import Colors from '../../constants/Colors';

const CrossIcon = () => (
  <Image
    source={require('../../assets/images/cross.png')}
    style={{ width: 24, height: 24 }}
    resizeMode="contain"
  />
);
const Bible = () => (
  <Image
    source={require("../../assets/images/bible.png")}
    style={{ width: 24, height: 24 }}
    resizeMode="contain"
  />
);
const Plan = () => (
  <Image
    source={require("../../assets/images/plan.png")}
    style={{ width: 24, height: 24 }}
    resizeMode="contain"
  />
);



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bible Basics',
          tabBarIcon: () => <CrossIcon />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'Lessons',
          tabBarIcon: () => <Plan />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: 'Bible',
          tabBarIcon: () => <Bible />,
        }}
      />
    </Tabs>
  );
}
