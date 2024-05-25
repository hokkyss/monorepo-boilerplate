'use client';

import { useCallback, useReducer } from 'react';

function booleanReducer(state: boolean, action: 'toggle' | boolean) {
  if (typeof action === 'boolean') {
    return action;
  }

  if (action === 'toggle') {
    return !state;
  }

  throw new Error(`booleanReducer: invalid action`);
}

export interface UseBooleanReturn {
  setFalse: () => void;
  setTrue: () => void;
  setValue: (value: boolean) => void;
  toggle: () => void;
  value: boolean;
}

export default function useBoolean(initialValue: boolean): UseBooleanReturn {
  const [value, dispatch] = useReducer(booleanReducer, initialValue);

  const setTrue = useCallback(() => dispatch(true), []);
  const setFalse = useCallback(() => dispatch(false), []);
  const toggle = useCallback(() => dispatch('toggle'), []);
  const setValue = useCallback((val: boolean) => dispatch(val), []);

  return {
    setFalse,
    setTrue,
    setValue,
    toggle,
    value,
  };
}
