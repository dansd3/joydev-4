import { createEcho } from './components/echo';
import type { TLogger } from './components/logger.types';

export const createHiddenLogger = (): TLogger => {
  const echo = createEcho(); 

  return {
    $log: console.log,
    $error: console.error,
    $warn: console.warn,
    $clear: () => {
      echo.$clear();
    },
    $print: (expand = false) => {
      echo.$print(expand);
    },
    echo, 
  };
};
