import { type ReactNode, forwardRef, memo } from 'react';

import shallowEqual from '../shallow-equal/shallow-equal';

export type CardProps = {
  children: ReactNode;
  className?: string;
  href: string;
  title: string;
};

const Card = memo(
  forwardRef<HTMLAnchorElement, CardProps>(({ children, className, href, title }, ref) => {
    return (
      <a
        className={className}
        href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
        ref={ref}
        rel="noopener noreferrer"
        target="_blank"
      >
        <h2>
          {title} <span>-&gt;</span>
        </h2>
        <p>{children}</p>
      </a>
    );
  }),
  (prevProps, nextProps) => {
    return shallowEqual(prevProps, nextProps);
  },
);

Card.displayName = 'Card';

export default Card;
