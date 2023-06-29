import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Platform, Alert } from 'react-native'
import * as TaskManager from "expo-task-manager"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
})


const registerForPushNotificationsAsync = async () => {
    let token

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Sorry, we need notifications permission to make this work')
            return
        }

        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token, "This is the token")
    }
    else {
        Alert.alert("You need a physical device")
    }
    return token
}

export const notificationSubscription = (notificationHandler) => {
    const [notificationToken, setNotificationToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {

        registerForPushNotificationsAsync().then(token => setNotificationToken(token))

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })


        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }

    }, [])
}


export const scheduleNotification = async (body) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Congratulations",
            body: body,
            sound: "default",
        },
        trigger:null,
        identifier:"Timer notification"
    })
}