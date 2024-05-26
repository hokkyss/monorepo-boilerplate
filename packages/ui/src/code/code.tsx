import { type PropsWithChildren, forwardRef, memo } from 'react';

import shallowEqual from '../shallow-equal/shallow-equal';

export type CodeProps = PropsWithChildren<{
  className?: string;
}>;

const Code = memo(
  forwardRef<HTMLElement, CodeProps>(({ children, className }, ref) => {
    return (
      <code className={className} ref={ref}>
        {children}
      </code>
    );
  }),
  ({ ...prevProps }, { ...nextProps }) => {
    return shallowEqual(prevProps, nextProps);
  },
);

Code.displayName = 'Code';

export default Code;
