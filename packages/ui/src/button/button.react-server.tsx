import type { ButtonProps } from './button.props';

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}
export type { ButtonProps };
