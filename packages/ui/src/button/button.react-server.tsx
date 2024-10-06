import type { ButtonHTMLAttributes, DOMAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<
  Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    keyof DOMAttributes<HTMLButtonElement>
  >
>;

export default function Button(props: ButtonProps) {
  return <button {...props} />;
}
