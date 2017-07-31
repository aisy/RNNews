//import liraries
import React, { Component } from 'react';
import { Alert, AppRegistry, TouchableOpacity, TextInput, Image, ListView, StyleSheet, Text, View } from 'react-native';
import { Header, Icon, Item, Input, Container, Left, Button, Title, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code

// create a component

// var REQUEST_URL = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=eed31de19a48444e9fd92c1304b196df';

export default class NewsList extends Component {

    // constructer to set Row
    constructor(props) {
        super(props)
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

    // fetch data form API URL
    fetchData(props) {

        // read data from Source.source and put on the API URL
        let sc = this.props.source;
        let url1 = 'https://newsapi.org/v1/articles?source=' + sc + '&sortBy=latest&apiKey=eed31de19a48444e9fd92c1304b196df';

        // fetching URL
        fetch(url1)
            // response json data 
            .then((response) => response.json())
            .then((responseData) => {

                // set state to send data on render
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.articles),
                    loaded: true,
                });
            })
            .catch((error) => {
                //handle error if service is not respond    
                Alert.alert(
                    'Error',
                    'Sorry.. Service is not Respond',
                    [
                        { text: 'Back to News Sources', onPress: () => Actions.source() },
                    ]
                )
            });
        // .done();
    }

    // Search feature
    setSearchText(event) {
        let searchText = event.nativeEvent.text;
        this.setState({ searchText });
        // data_list = data;

        let sc = this.props.source;
        let url1 = 'https://newsapi.org/v1/articles?source=' + sc + '&sortBy=latest&apiKey=eed31de19a48444e9fd92c1304b196df';

        // fetch from list 
        fetch(url1, {
            context: this,
            asArray: true,
            then(data) {

                // filterring data 
                let filteredData = this.filterNews(searchText, data);
                this.setState({

                    // change data when filter was inputed by user
                    dataSource: this.ds.cloneWithRows(filteredData),
                    rawData: data,
                });
            }
        });

        // let filteredData = this.filterNews(searchText, data);
        // this.setState({dataSource:this.DataSource.cloneWithRows(filteredData),rawData:data,})
    }

    // function filter
    filterNews(searchText, news) {
        let text = searchText.toLowerCase();

        return filter(news, (n) => {
            let newss = n.body.toLowerCase();
            return newss.search(text) !== -1;
        });
    }

    // render 
    render() {
        // make loading bar
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        // create Listview then render with RenderSources()
        return (

            <Container>

                {/* create searchbox */}
                <TextInput
                    style={styles.searchBar}
                    value={this.state.searchText}
                    onChange={this.setSearchText.bind(this)}
                    placeholder='Search'
                />

                {/* create View List from datasource */}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderNews}
                />

            </Container>
        );

    }

    // reder loading
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading News...
                </Text>
            </View>
        );
    }

    // render source 
    renderNews(news, props) {
        {/*card*/ }
        return (
            <View style={styles.container}>

                {/* create feature touch to send data on Webview */}
                <TouchableOpacity onPress={() => Actions.webview({ url: news.url })} >
                    <Image
                        source={{ uri: news.urlToImage }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        {/*<Text>{this.props.source}</Text>*/}
                        <Text style={styles.title}>{news.title}</Text>
                        <Text style={styles.content}>{news.description}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    searchBar: {
        paddingLeft: 30,
        fontSize: 22,
        height: 10,
        flex: .1,
        borderWidth: 9,
        borderColor: '#E4E4E4',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 10,
        marginBottom: 8,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    content: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 90,
        // marginRight: 10
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

//make this component available to the app
module.export = 'NewsList';
