import type { ButtonProps } from './button.props';

import isEqual from 'lodash/isEqual';
import { forwardRef, memo } from 'react';

import shallowEqual from '../shallow-equal/shallow-equal';

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
export type { ButtonProps };
