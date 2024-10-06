import Ionicons from '@expo/vector-icons/Ionicons';
import { type PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function Collapsible({ children, title }: { title: string } & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const { styles } = useStyles(stylesheet);

  return (
    <ThemedView>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setIsOpen((value) => !value)} style={styles.heading}>
        <Ionicons color={styles.icon.color} name={isOpen ? 'chevron-down' : 'chevron-forward-outline'} size={18} />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  content: {
    marginLeft: 24,
    marginTop: 6,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  icon: {
    color: theme.colors.typography,
  },
}));
