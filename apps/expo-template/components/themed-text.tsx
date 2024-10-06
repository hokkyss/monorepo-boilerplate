import { Text, type TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type ThemedTextProps = {
  type?: 'default' | 'defaultSemiBold' | 'link' | 'subtitle' | 'title';
} & TextProps;

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <Text
      style={[
        styles.shared,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  link: {
    color: '#0a7ea4',
    fontSize: 16,
    lineHeight: 30,
  },
  shared: {
    color: theme.colors.typography,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
}));
