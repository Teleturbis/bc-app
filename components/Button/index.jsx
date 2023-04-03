import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MyButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={(e) => onPress(e)}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
});
