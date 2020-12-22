import { useSiteStore } from '.';

const useStoreFocusListeners = () => {
  const { dispatch } = useSiteStore();

  return {
    onMouseEnter: () => dispatch('focusing/set', true),
    onMouseLeave: () => dispatch('focusing/set', false),
  };
};

export { useStoreFocusListeners };
