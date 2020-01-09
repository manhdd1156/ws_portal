
/*
 19/12/2019    FIT-ManhDD16     Created

*/

import React from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-and-time';
import { scale, moderateScale, verticalScale, Colors } from '../constants/config';

const wrapText = props => {
    const { serial, children, fillColor, propStyles } = props;
    // console.log('serial ,children fillColor:', serial, children, fillColor)
    if (serial) {
        return (
            <Text style={styles.blockText} numberOfLines={1} ellipsizeMode="tail">
                <Text style={styles.wrapText}>{`${serial}. `}</Text>
                <Text style={[styles.wrapText, styles.keyField]}>{children}</Text>
            </Text>
        )
    } else {
        return (
            <Text style={styles.blockText} numberOfLines={1} ellipsizeMode="tail">
                <Text style={[styles.wrapText, propStyles, fillColor ? styles.fillColor : {}]}>{children}</Text>
            </Text>
        )
    }

};
const styles = StyleSheet.create({
    wrapText: {
        fontSize: moderateScale(16),
        corlor: Colors.black
    },
    keyField: {
        color: Colors.secondaryColor
    },
    blockText: {

    },
    fillColor: {
        color: Colors.primaryColor
    },
    orderNumberText: {
        color: Colors.secondaryColor,
    },
    frontOrderText: {
        flex: 1 / 2
    },
    stateText: {
        color: Colors.primaryColor,
        flex: 1 / 2
    },
    moneyText: {
        flex: 1 / 2
    }
});
export default wrapText;

