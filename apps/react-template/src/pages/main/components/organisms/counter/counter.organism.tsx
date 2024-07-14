import shallowEqual from '@monorepo/ui/shallow-equal';
import { memo } from 'react';

import envConfig from '../../../../../configs/env/env.config';
import useCounterStore from '../../../../../providers/counter-store/use-counter-store.hook';

const Counter = memo(() => {
  const counter = useCounterStore((store) => store.count);
  const decreaseCounter = useCounterStore((store) => store.decrease);
  const increaseCounter = useCounterStore((store) => store.increase);

  return (
    <div>
      <button onClick={decreaseCounter}>-</button>
      Counter: {counter}
      <button onClick={increaseCounter}>+</button>
    </div>
  );
}, shallowEqual);

if (envConfig.env === 'development') {
  Counter.displayName = 'Counter';
}

export default Counter;
