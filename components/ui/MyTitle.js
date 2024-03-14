import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const MyTitle = ({ children }) => {
    return (
        <Text style={styles.title}>{children}</Text>
    );
};

export default MyTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
})