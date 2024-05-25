import type { PropsWithChildren } from 'react';

export type CodeProps = PropsWithChildren<{
  className?: string;
}>;

export default function Code({ children, className }: CodeProps) {
  return <code className={className}>{children}</code>;
}
