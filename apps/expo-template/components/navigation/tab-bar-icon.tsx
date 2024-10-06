// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import type { IconProps } from '@expo/vector-icons/build/createIconSet';
import type { ComponentProps } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  const { styles } = useStyles(stylesheet);

  return <Ionicons size={28} style={[styles.default, style]} {...rest} />;
}

const stylesheet = createStyleSheet(() => ({
  default: {
    marginBottom: -3,
  },
}));
