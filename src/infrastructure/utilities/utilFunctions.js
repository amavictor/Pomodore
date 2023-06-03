
import { moderateScale, scale, moderateVerticalScale, verticalScale, s } from 'react-native-size-matters';

export const mScale = (size, scaleFactor) => Math.ceil(moderateScale(size,scaleFactor))
export const nScale = (size) => Math.round(scale(size))
export const mVScale = (size) => Math.round(moderateVerticalScale(size))
export const vScale = (size) => Math.round(verticalScale(size))



