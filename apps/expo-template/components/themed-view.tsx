import { View, type ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type ThemedViewProps = {
  darkColor?: string;
  lightColor?: string;
} & ViewProps;

export function ThemedView({ darkColor, lightColor, style, ...otherProps }: ThemedViewProps) {
  const { styles } = useStyles(stylesheet);

  return <View style={[styles.background(darkColor ?? '#000', lightColor ?? '#fff'), style]} {...otherProps} />;
}

const stylesheet = createStyleSheet((theme) => ({
  background: (darkColor: string, lightColor: string) => ({
    backgroundColor: theme.mode === 'light' ? lightColor : darkColor,
  }),
}));
