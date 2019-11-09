import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function MonthCalender(props){
  return (<View style={styles.container}>
      <ScrollView horizontal>
        {props.monthData.map((item, index) => (
          <TouchableOpacity onPress={(()=>props.callBackOnPress(index))}>
              <Text style={[styles.monthText,
               props.selectedMonth === index ? {opacity: 1} :{opacity: 0.3} ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
            ))}
      </ScrollView>
        </View> 
      )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 30,
    marginBottom: 10,
  }, 
  monthText:{
    opacity: 0.3,
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#000000",
    letterSpacing: 0,
    paddingLeft: 15,
    paddingRight: 15, 
    paddingTop: 7
      } 
});