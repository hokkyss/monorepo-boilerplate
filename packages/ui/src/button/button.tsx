/**
 *
 */

import type { ReactNode } from 'react';

export type ButtonProps = {
  appName: string;
  children: ReactNode;
  className?: string;
};

export default function Button({ appName, children, className }: ButtonProps) {
  return (
    <button className={className} onClick={() => alert(`Hello from your ${appName} app!`)} type="button">
      Button
      {children}
    </button>
  );
}
