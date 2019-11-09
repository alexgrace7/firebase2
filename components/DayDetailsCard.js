import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function InvationCard(props) {
  let imageBase =
    'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

  function formatDate(date) {
    return date.format('h:mm a');
  }

  function headerForCalendar(date){
        return date.format('dddd Do MMMM');
  }


  return (
    <View style={styles.container}>
    <Text style={styles.dayHeader}>
        {headerForCalendar(props.date)}
    </Text>
    {props.accepted=== true ? (<View style={styles.topSection}>
        <Image
          style={styles.profileImage}
          source={{ uri: imageBase + props.pic }}
        />
        <View style={styles.textSection}>
          <Text>{props.name}</Text>
          <Text>{formatDate(props.date)}</Text>
        </View>
      </View>): (
        <View style={styles.addEventButton}>
          <Image source={require('../assets/addnewEventButton.png')}/>
        </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: 110,
  },
  addEventButton:{
     flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayHeader:{
    fontFamily: 'Helvetica',
    fontSize: 13,
    color: '#000000',
    padding: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
    borderTopColor: 'grey', 
    borderTopWidth: 1,
  },
  
});
