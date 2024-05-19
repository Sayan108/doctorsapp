import { Dimensions } from 'react-native';

const useResponsiveSize = (baseSize:number) => {
  const { width } = Dimensions.get('window');
  const scale = width / 375;
  return baseSize * scale;
};

export default useResponsiveSize;
