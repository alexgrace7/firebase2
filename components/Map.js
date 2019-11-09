import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function Map(props){

  Map.navigationOptions = {
    title:"Map",
    headerStyle: {
      backgroundColor: "green"
    }
  }

  return (
<View>
    {props.showMap ? 
    <View style = {styles.container}>
      <Text> MAP HERE</Text>
        </View> : null  }
</View>
      )
}


const styles = StyleSheet.create({
    container: {
        height: 500,
        width: 500,
        backgroundColor: '#7CFC00',
        zIndex: 9999,
        position: 'absolute',

      },
    })
