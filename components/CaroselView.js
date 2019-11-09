import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import InvitationCard from './InvitationCard';
import { Dimensions } from 'react-native';

export default function CaroselView(props) {
  let deviceWidth = Dimensions.get('window').width;

  function renderItem({ item, index }) {
    return (
      <InvitationCard
        id={item.id}
        pic={item.pic}
        name={item.name}
        date={item.date}
        acceptInvitationCallBack = {props.acceptInvitationCallBack}
        declineInvitationCallBack= {props.declineInvitationCallBack}
      />
    );
  }

if(props.eventsData.length > 0){
  return (
    <View style={styles.container}>
      <Carousel
        data={props.eventsData}
        renderItem={renderItem}
        sliderHeight={200}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth * 0.8}
        />
    </View>
  );
}
return(<View/>)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 170,
    paddingTop: 15,
  },
});
