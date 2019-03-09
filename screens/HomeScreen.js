import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import newId from '../utils/newid';
import FilterButtons from '../components/FilterButtons';
import eventTypes from '../assets/data/data'

const API = 'https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2019/';
const DEFAULT_QUERY = 'android.json';
const MY_LOCATION = 'San Francisco'
const GOOGLE_KEY = 'AIzaSyAQ3LdY61bLSU95-gu_6EQ25bobZ2B5peo'
const FETCH_GOOGLE_API = false

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            events: [],
            isLoading: false,
            error: null,
            longitude: null,
            latitude: null
        };
        this.arrayholder = [];
    }

    manageData(data, eventType) {
        let newData = [];
        data.forEach(element => {
            newData.push({ key: newId(), ...element })
        });
        let updatedData = this.state.events.concat(newData)
        this.setState({ events: updatedData });
        this.arrayholder = updatedData;
    }

    makeRemoteRequest = () => {
        this.setState({ isLoading: true });

        eventTypes.forEach(type => {
            fetch(API + type + '.json')
                .then(res => res.json())
                .then(data => {
                    this.manageData(data);
                })
                .catch(error => {
                    this.setState({ error, isLoading: false });
                });
        })

        this.setState({ isLoading: false });
    };

    componentDidMount() {
        this.makeRemoteRequest();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                if (FETCH_GOOGLE_API) {
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + GOOGLE_KEY)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                        })
                }
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    updateSearch = search => {
        this.setState({ search });
    };

    searchFilterFunction = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.city.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ events: newData });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        const { search } = this.state;

        if (this.state.isLoading) {
            return <Text style={styles.getStartedText}>Loading ...</Text>;
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                />
                <FilterButtons></FilterButtons>
                <Text>longitude:{this.state.longitude}</Text>
                <Text>longitude:{this.state.latitude}</Text>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        data={this.state.events}
                        renderItem={({ item }) => <ListItem title={item.name} subtitle={item.city} rightSubtitle={item.startDate} />}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    contentContainer: {
        paddingTop: 30,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});