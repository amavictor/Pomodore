
import { moderateScale, scale, moderateVerticalScale, verticalScale, s } from 'react-native-size-matters';

export const mScale = (size, scaleFactor) => Math.ceil(moderateScale(size, scaleFactor))
export const nScale = (size) => Math.round(scale(size))
export const mVScale = (size) => Math.round(moderateVerticalScale(size))
export const vScale = (size) => Math.round(verticalScale(size))


export const setTimeOfDay = () => {
    var time = new Date().getHours()
    switch (true) {
        case time < 12:
            return "Morning"
        case (time >= 12 && time <= 18):
            return "Afternoon"
        case (time > 18):
            return "Evening"
        default : ""
    }

}

export const removeTask = (task, item) => {
    task.filter((activity)=> activity.title !== item.item)
}