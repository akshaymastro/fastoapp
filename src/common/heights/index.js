import { moderateScale } from 'react-native-size-matters';

// To set the constant heights for I-pad/Tablet and Android/IOS devices
export const heights = (value) => {
    let height = moderateScale(value);
    return height;
}