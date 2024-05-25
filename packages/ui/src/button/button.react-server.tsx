import type { ReactNode } from 'react';

export type ButtonProps = {
  appName: string;
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
