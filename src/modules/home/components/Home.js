/*
 10/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image, ImageBackground, Dimensions, SectionList, TouchableCmp } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainMenuGrid from '../../../userControls/MainMenuGrid';
import HeaderButton from '../../../userControls/HeaderButton';
import { styles } from '../styles/homeStyle'
import { Header, Title, Left, Right, Body, } from 'native-base';
// import socketIOClient from 'socket.io-client';
import { NavigationActions, StackActions } from 'react-navigation'
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { convertFunctionList } from '../../../libs/componentHelper'
import registerForPushNotificationAsync from '../../../constants/registerForPushNotificationsAsync'
import { checkLogin } from '../../../libs/componentHelper';
import io from 'socket.io-client/dist/socket.io';
const backgroundImage = require('../../../assets/images/background2.png');

export default class Home extends Component {
    constructor(props) {
        super(props);
        // initComponent(this, props);

        this.state = {
            ...this.state,
            notification: {},
        };
        // console.log('this : ', this)
        // console.log('props : ', props)
        // this.socket = socketIOClient('http://api.socket/');
        // this.socket = io("localhost:3000", { jsonp: false });
        // this.socket.on("connect", () => {
        //     console.log("connected to server");
        // });
        // this.socket.on('update', () => {
        //     console.log("response");
        // });
    }
    async componentDidMount() {
        await checkLogin(this);
        // const connectionConfig = {
        //     jsonp: false,
        //     path: '/test',
        //     reconnection: true,
        //     reconnectionDelay: 100,
        //     reconnectionAttempts: 100000,
        //     // transports: ["websocket"] // you need to explicitly tell it to use websockets
        // };
        // this.socket = socketIOClient("http://10.8.6.67:80", connectionConfig);
        // this.socket = socketIOClient("http://10.8.6.67:80", { path: '/socket.io' });
        // this.socket = io("localhost:3000", { jsonp: false });
        // console.log('herer 2')
        // console.log('socket :', this.socket)
        // this.socket.on("connect", () => {
        //     console.log("connected to server");
        // });
        // this.socket.on('update', (messages) => {
        //     console.log("response" + messages);
        // });
        // let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        // if (Constants.isDevice && result.status === 'granted') {
        //     console.log('Notification permissions granted.', Constants.isDevice)
        // }
        // console.log('pass here1')

        // const schedulingOptions = {
        //     time: (new Date())
        // }
        // Notifications.addListener((this._handleNotification));
        // console.log('pass here2')




        // // this.socket.emit("update", "Channel1 emitting");
        // try {
        //     this.socket.on('my_broadcast_event', (mess) => {
        //         console.log('received messs')
        //         const localNotification = {
        //             title: 'mess',
        //             body: 'mess',
        //         };
        //         Notifications.scheduleLocalNotificationAsync(
        //             localNotification, schedulingOptions
        //         );
        //     })
        //     registerForPushNotificationAsync();
        // } catch (error) {
        //     console.log('error ;', error)
        // }


    }
    handleNotification() {
        console.warn('ok! got your notif');
    }
    _handleNotification = (notification) => {
        if (notification) {
            // console.log('this.props.na : ', notification)
            // this.props.navigation.dispatch(StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'Home' })]
            // }))
            // this.props.navigation.navigate('Order')
            // this.setState({ notification: notification });
        }
    };
    render() {
        const { notification, currentRole } = this.state
        const { functionList } = this.props

        const renderFunctionList = convertFunctionList(functionList)
        if (renderFunctionList.length === 0) return (<React.Fragment />);
        const renderGridItem = (itemData) => {
            const numColumns = 2;
            // console.log('itemData : ', itemData)
            if (itemData.index % numColumns !== 0) return null; //numColumns  = 2

            const items = [];

            for (let i = itemData.index; i < itemData.index + numColumns; i++) {
                if (i >= itemData.section.data.length) {
                    break;
                }

                items.push(
                    <MainMenuGrid
                        title={itemData.section.data[i].functionName}
                        onSelect={() => {
                            try {
                                console.log('itemData.section.data[i].functionUrl :', itemData.section.data[i].functionUrl)
                                this.props.handleChangeCurrentFunction(itemData.section.data[i].functionId);
                                this.props.navigation.navigate({
                                    routeName: itemData.section.data[i].functionUrl,
                                    // params: {
                                    //     testParam: 'testparam'
                                    // }
                                });
                            } catch (error) {
                                console.log('error : ', error)
                            }
                        }}
                    />
                );
            }

            return (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    {items}
                </View>
            );
        };
        return (
            <View style={styles.container} >
                <Header style={styles.headerView}>
                    <Left >
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title="Menu"
                                iconName="ios-menu"
                                onPress={() => {
                                    this.props.navigation.toggleDrawer();
                                    // navData.navigation.navigate('Drawer',{test: 'toto'});
                                }}
                            />
                        </HeaderButtons>
                    </Left>
                    <Body style={styles.titleBodyView}>
                        <Title style={styles.title}>{"Trang chủ"}</Title>
                    </Body>
                    <Right />
                </Header>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <SectionList
                        keyExtractor={(item, index) => item._id}
                        sections={renderFunctionList}
                        renderSectionHeader={({ section }) => (
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>{section.title}</Text>
                            </View>
                        )}
                        renderItem={renderGridItem}

                    />
                </ImageBackground>

            </View>
        );

    };
}
