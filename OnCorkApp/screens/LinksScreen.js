import React from 'react';
import { ScrollView, StyleSheet,View,FlatList,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  
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
          dataSource: responseJson.announcements,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){
    return(
      <View style={{flex: 1, paddingTop:20, backgroundColor: 'white'}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Annoucements:</Text>
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>
       <View> 
        <Text></Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.title}</Text>
        <Text>{item.text}</Text> 
        <Text>{item.created}</Text>
        <Text></Text>
        </View>
            
      }
        keyExtractor={({id}, index) => id}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
