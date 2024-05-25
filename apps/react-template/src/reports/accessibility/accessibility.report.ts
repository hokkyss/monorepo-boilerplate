import React from 'react';
import * as ReactDOM from 'react-dom/client';

import envConfig from '../../configs/env/env.config';

/**
 * Accessibility report using `@axe-core/react`
 */
const reportAccessibility = async (): Promise<void> => {
  if (envConfig.env !== 'development') {
    return;
  }

  const { default: axe, logToConsole } = await import('@axe-core/react');
  await axe(React, ReactDOM, 500, undefined, undefined, logToConsole);
};

export default reportAccessibility;
