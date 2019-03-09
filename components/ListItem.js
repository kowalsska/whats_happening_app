import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text style={styles.name}>{this.props.item.name}</Text>
                <Text style={styles.city}>{this.props.item.city}</Text>
                <Image style={styles.image} source={require('../assets/images/robot-dev.png')} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        // marginTop: 10
        marginTop: -1,
        marginBottom: 10
    },
    textStyle: {
        fontSize: 20
    },
    name: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    city: {
        padding: 10,
        fontSize: 12,
        height: 30,
    },
    image: {
        width: 20,
        height: 20,
        right: 10,
    }
});

export default ListItem;
