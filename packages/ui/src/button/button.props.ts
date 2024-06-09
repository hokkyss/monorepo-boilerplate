import type { CSSProperties, ReactNode } from 'react';

export type ButtonProps = {
  appName: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};
