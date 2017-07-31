//import liraries
import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity, ListView, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code


var REQUEST_URL = 'https://newsapi.org/v1/sources?language=en';

export default class Source extends Component{

    // constructer to set Row
    constructor(props) {
        super(props)
        const { navigate } = props.navigation;
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        
    }

    componentDidMount() {
        this.fetchData();
    }

    //fetch data form API URL
    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json()) //read to json
            // response data 
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sources),
                    loaded: true,
                });
            })
            // .catch((error) => {
            //     console.error(error);
            // });
            .done();
    }

    
    render() {

        // make loading bar
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        // create Listview then render with RenderSources()
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderSources}
            />
        );

    }

    // reder loading
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading Sources News...
                </Text>
            </View>
        );
    }

    // render source 
    
    renderSources(source) {
        
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={ () => Actions.news({ source:source.id }) } >
                    <View style={styles.rightContainer}>
                        {/*<Text style={styles.title}>{source.id}</Text>*/}
                        <Text style={styles.title}>{source.name}</Text>
                        <Text style={styles.year}>{source.country}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

// // create a component
// const Source = () => {
    
//     return (
//         <View style={styles.container}>
//             <Text>Source</Text>
//         </View>
//     );
// };

// define your styles
const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    rightContainer: {
        backgroundColor: 'blue',
    }
});


//make this component available to the app
module.export = "Source";
