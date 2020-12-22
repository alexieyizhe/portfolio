import { useStore } from '.';

export const useStoreFocusListeners = () => {
  const { dispatch } = useStore();

  return {
    onMouseEnter: () => dispatch('focusing/set', true),
    onMouseLeave: () => dispatch('focusing/set', false),
  };
};
