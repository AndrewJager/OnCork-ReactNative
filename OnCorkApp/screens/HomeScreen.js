import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SectionList,
  Button,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://oncork.herokuapp.com/teams/api/team/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.users,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={{flex: 1, paddingTop:20, backgroundColor: 'white'}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =><View style={styles.employee}>
            <Image source={{uri: getImage(item.profile_picture)}}
            style={{width: 70, height: 70, borderRadius: 8, marginLeft: -8}}>

            </Image>
            <Text style={{ marginTop: 15, marginLeft: 4,
                fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                {item.name}</Text>
            <Text style={{fontSize: 16,
              marginTop: 45,
              position: "absolute",  bottom: 10, left: 75, color: getTextColor(item.status)}}>
              {item.status_text}
            </Text>
           
            <View style={{width: 50, height: 50, backgroundColor: getStatusColor(item.status), position: "absolute",  bottom: 10, right: 0}} />
          
        </View>}
          keyExtractor={({id}, index) => id}
        />
      </View>
		  
      </ScrollView>
    );
  }

  
  

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

function getStatusColor(input){
  if (input){
    return '#82D570';
  }
  else{
    return '#D1484F';
  }
}

function getTextColor(input){
  if (input){
    return '#82D570';
  }
  else{
    return '#D1484F';
  }
}

function getImage(input){
  if (input == null){
    return './assets/images/robot-prod.png';
  }
  else{
    return input;
  }
}

const styles = StyleSheet.create({
  statusText: {
    fontSize: 16,
    marginTop: 45,
    position: "absolute",  bottom: 10, left: 75,
    color: 'white',
  },
  employee: {
    textAlign: 'center',
    marginLeft: 10,
    flex: 1,
    
    flexDirection: 'row',
  },
  employeeText: {
    marginTop: 15,
    fontSize: 24,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  header: {
    fontSize: 18,
    color: '#00cc00',
    marginTop: 14,
    textAlign: 'center',
  },
});

