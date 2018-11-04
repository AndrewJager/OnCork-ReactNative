import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, TextInput,  } from 'react-native';

export default class FetchExample extends React.Component {

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



  render(){
    return(
      <View>
        <Button
        onPress={() => {
          Alert.alert('You tapped the button!');
        }}
        title='Here'
      />
      <Button
        onPress={() => {
          Alert.alert('You tapped the button!');
        }}
        title='Away'
      />
      <TextInput
        style={{height: 40}}
        placeholder="Team ID"
        onChangeText={(text) => this.setState({text})}
      />
      <TextInput
        style={{height: 40}}
        placeholder="User ID"
        onChangeText={(text) => this.setState({text})}
      />
    </View>
    )
  }
}

function getButtonText(input){
  if (input){
    return 'Sign in';
  }
  else{
    return 'Sign out';
  }
}
