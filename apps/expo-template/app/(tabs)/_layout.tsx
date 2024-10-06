import { Tabs } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TabBarIcon } from '../../components/navigation/tab-bar-icon';

export default function TabLayout() {
  const { styles } = useStyles(stylesheet);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: styles.activeColor.backgroundColor,
        tabBarActiveTintColor: styles.activeColor.tintColor,
        tabBarInactiveBackgroundColor: styles.inactiveColor.backgroundColor,
        tabBarInactiveTintColor: styles.inactiveColor.tintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon color={color} name={focused ? 'home' : 'home-outline'} />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name={focused ? 'code-slash' : 'code-slash-outline'} />
          ),
          title: 'Explore',
        }}
      />
    </Tabs>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  activeColor: {
    backgroundColor: theme.colors.background,
    tintColor: theme.colors.typography,
  },
  inactiveColor: {
    backgroundColor: theme.colors.background,
    tintColor: theme.colors.typography,
  },
}));
