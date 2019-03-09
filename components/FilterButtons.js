import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native';
import Geocoder from 'react-native-geocoding';


class FilterButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            user_city: null,
            user_latitude: null,
            user_longitude: null,
        };
    }

    filterBy(type) {
        console.log("filtering");
        switch (type) {
            case 'location': {
                console.log("by location");
                const newData = this.state.records.filter(item => {
                    const itemData = `${item.name.toUpperCase()} ${item.city.toUpperCase()} `;
                    const textData = this.state.user_city.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                this.setState({ records: newData });
            }
        }

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