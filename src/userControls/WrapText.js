
/*
 19/12/2019    FIT-ManhDD16     Created

*/
import React from 'react';
import _ from 'lodash';
import { Text } from 'react-native';
// import { format } from 'date-and-time';
import { styles } from '../styles/wrapTextStyle';
const WrapText = props => {
    const { serial, children, fillColor, propStyles, numberOflines } = props;
    // console.log('serial ,children fillColor:', serial, children, fillColor)
    return (
        <Text style={styles.blockText} numberOfLines={numberOflines ? numberOflines : 1} ellipsizeMode="tail">
            <Text style={[styles.wrapText, propStyles, fillColor ? styles.fillColor : {}]}>{children}</Text>
        </Text>
    )
};

export default WrapText;