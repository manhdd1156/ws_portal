import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'
import { Platform } from 'react-native'


export default (async function registerForPushNotificationsAsync() {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        return;
    }
    try {
        // let token = await Notifications.getExpoPushTokenAsync();
        // console.log('firebase.auth :', firebase.auth())
        // userID = firebase.auth().currentUser.uid;
        // return fetch(PUSH_ENDPOINT, {
        //     method: 'POST',
        //     headers: {
        //         accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         token: {
        //             value: token
        //         },
        //         user: {
        //             username: 'Manh'
        //         }
        //     })
        // });

      
    } catch (error) {
        console.log('error :', error)
    }
})