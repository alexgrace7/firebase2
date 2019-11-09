import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import DayDetailsCard from './DayDetailsCard';
import moment from 'moment';

export default function DayCalendar(props) {
  let firstdate =
    props.eventsForMonth.length > 0
      ? props.eventsForMonth[0].date
      : moment([2019, 11, 1]);
  let year = firstdate.year();
  //Could optimize by ingnoring event before previous date
  function padEvents(month, eventsForMonth) {
    let eventDayMap = [];
    eventsForMonth.map(event => {
      eventDayMap[event.date.date() - 1] = event;
    });

    //Get number of days in month
    let numdays = firstdate.daysInMonth();
    for (let i = 0; i < numdays; i++) {
      if (eventDayMap[i] == undefined) {
        eventDayMap[i] = {
          id: i,
          date: moment([year, month, i + 1]),
        };
      } else {
        eventDayMap[i].id = i;
      }
    }
    return eventDayMap;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={padEvents(props.month, props.eventsForMonth)}
        renderItem={({ item }) => (
          <DayDetailsCard
            id={item.id}
            pic={item.pic}
            name={item.name}
            date={item.date}
            accepted={item.accepted}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
