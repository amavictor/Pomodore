import { View, StyleSheet } from "react-native"
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export const CustomBackdrop = (props) =>
    <BottomSheetBackdrop {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />
