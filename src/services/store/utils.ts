import { useToggleFocusing } from './new';

export const useStoreFocusListeners = () => {
  const toggleFocusing = useToggleFocusing();

  return {
    onMouseEnter: () => toggleFocusing(true),
    onMouseLeave: () => toggleFocusing(false),
  };
};
