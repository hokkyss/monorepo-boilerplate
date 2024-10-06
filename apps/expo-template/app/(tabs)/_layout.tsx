import { Tabs } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TabBarIcon } from '../../components/navigation/tab-bar-icon';

export default function TabLayout() {
  const { styles } = useStyles(stylesheet);

  return (
    // https://www.unistyl.es/reference/faq/#:~:text=Library%20assumes%20that%20your%20app%20is%20not%20edge%2Dto%2Dedge%20and%20adds%20padding.%20To%20fix%20this%2C%20it%20requires%20both%20statusBarTranslucent%20and%20navigationBarTranslucent%20to%20be%20set%20to%20true
    <KeyboardProvider navigationBarTranslucent statusBarTranslucent>
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
    </KeyboardProvider>
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
