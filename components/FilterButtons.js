import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native';

class FilterButtons extends Component {
    constructor(props) {
        super(props);
    }

    filterBy(type) {
        console.log("hello " + type);
    }

    render() {
        return (
            <View style={styles.main}>
                <Button style={styles.button} title="By location" onPress={() => this.filterBy("location")} />
                <Button style={styles.button} title="By date" onPress={() => this.filterBy("date")} />
                <Button style={styles.button} title="By name" onPress={() => this.filterBy("name")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'powderblue',
    },
    button: {
        color: 'powderblue',
    },
});

export default FilterButtons;