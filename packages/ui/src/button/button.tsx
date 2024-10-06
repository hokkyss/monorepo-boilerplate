import isEqual from 'lodash/isEqual';
import { type CSSProperties, type ReactNode, forwardRef, memo } from 'react';

import shallowEqual from '../shallow-equal/shallow-equal';

export type ButtonProps = {
  appName: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { appName, children, className, style } = props;

    return (
      <button
        className={className}
        onClick={() => alert(`Hello from your ${appName} app!`)}
        ref={ref}
        style={style}
        type="button"
      >
        {children}
      </button>
    );
  }),
  ({ style: prevStyle, ...prevProps }, { style: nextStyle, ...nextProps }) => {
    if (!isEqual(prevStyle, nextStyle)) {
      return false;
    }

    return shallowEqual(prevProps, nextProps);
  },
);

Button.displayName = 'Button';

export default Button;
