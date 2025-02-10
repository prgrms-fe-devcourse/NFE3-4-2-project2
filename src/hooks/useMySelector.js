import { useSelector, shallowEqual } from 'react-redux';

const useMySelector = selector => {
  return useSelector(selector, shallowEqual);
};

export default useMySelector;
