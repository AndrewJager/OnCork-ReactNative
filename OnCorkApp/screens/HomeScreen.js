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
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          <Text style={styles.helpLinkText}>Header</Text>
        </Text>
      <View style={styles.helpContainer}>
      
      </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/robot-dev.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <SectionList
          renderItem={({item, index, section, empImage}) => <View style={styles.employee}>
            <Image source={{uri: 'https://pbs.twimg.com/profile_images/576457817990758400/qh8rfo2B_400x400.jpeg'}}
            style={{width: 70, height: 70}}>

            </Image>
            <Text style={styles.employeeText}>{item}</Text>
            <Button
              onPress={() => {
                Alert(getMoviesFromApiAsync())
              }}
              title="Press Me"
            />
          </View>
          }
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold', fontSize: 24, textAlign: 'center'}}>{title}</Text>
          )}
          sections={[
            {title: 'In office', data: ['Andrew', 'Matthew', 'Someone']},
            {title: 'Remote', data: ['Can', 'You']},
            {title: 'Out', data: ['Hear', 'Me?']},
          ]}
          keyExtractor={(item, index) => item + index }
        />
		  
        </ScrollView>

      </View>
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

function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

const styles = StyleSheet.create({
  employee: {
    textAlign: 'center',
    marginLeft: 10,
    flex: 1,
    
    flexDirection: 'row',
  },
  employeeText: {
    marginTop: 30,
    fontSize: 24,
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

