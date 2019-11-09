import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MonthCalender from './components/MonthCalendar'
import CaroselView from './components/CaroselView'
import DayCalendar from './components/DayCalendar'
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";
import config from './config'; //The config for firebase
import * as firebase from 'firebase';
import 'firebase/firestore';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import map from './components/Map';


//Keep the data at the highest level and then 
//have it flow to lower sub components. 

//converted to functional component 
export default function App() {


  if (!firebase.apps.length){
    firebase.initializeApp(config);
    }

    const db = firebase.firestore();

    // Console.log whether data being received or not
    let collection = db.collection('events').doc('0');
    let getDoc = collection.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      var data = doc.data();
      console.log('Document Data Retrieved');
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  // let collection2 = db.collection('events');
  // let query = collection2.get()
  //   .then(snapshot => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //       return;
  //     }
  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.get('name'));
        
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Error getting documents', err);

  //   })

    useEffect( () => {
      const fetchData = async () => {
        const snapshot = await firebase.firestore().collection('events').get()
        let toRet = snapshot.docs.map(doc => doc.data())
        // console.log(toRet)
        setEvents(assignIDs(toRet));
    }
      fetchData();
    },[]);
  
  

  
  //Screen really only has two states
  //Month and events 
   const [month, setMonth] = useState(new Date().getMonth());  
   const [events, setEvents] = useState([]);  

  // Hook The fires on onmount and gets data 
  // useEffect(() => {
  //     const fetchData = async () => {
  //       let response = await fetch(
  //         'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
  //       );
  //       let parseObject = await response.json();
  //       setEvents(assignIDs(parseObject));
  //     };
  //     fetchData();
  //   },[]);
    

//AssignIDs  this function will be remove in the future as id will be added to the invitations

function assignIDs(events){
  return events.map((event, index)=>{
    event.id = index
    event.date = moment(event.date, "DD-MM-YYYY hh:mm:ss")

    return event
  })
}

  //Method That Filters Events
  //This methods returns the events for a specific month
  function eventsForMonth(events, month){
    return events.filter((event)=>{
      //Get Month check to see if matches
        return event.date.month() === month 
         & event.accepted === true ? true : false
    })
  }

  //Method For setting MonthState 
  function callBackForSettingMonth(monthID){
    //Remember these will get merged into a single object
    setMonth(monthID)
  }

  //Methods for accepting invitation
  function acceptInvitation(eventID){
    setEvents(
        events.map(event => {
            if (event.id === eventID) event.accepted = true
            return event
        })
    )
  }

  //Methods for declining invitation
  function declineInvitation(eventID){
    setEvents(
        events.filter(event => {
          if(event.id === eventID){
            // delete the card
            firebase.firestore().collection('events').doc(toString(event.id)).delete().then(function() {
              console.log("Document succesfully deleted!")
            }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
          }
          
           return event.id === eventID ? false : true
        })
    )

  }

  //Method that filters Events Pending
  function eventsPending(events){
      return events.filter(event => {
           return event.accepted === undefined ? true : false
        })
  }


    return (
      <View style={styles.container}>
      <View style={{height: 40, width: "100%"}}/>
      <LinearGradient
          colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
      <MonthCalender 
        selectedMonth = {month} 
        monthData ={monthData} 
        callBackOnPress = {callBackForSettingMonth}
      />
      <CaroselView 
          eventsData = {eventsPending(events)} 
          acceptInvitationCallBack = {acceptInvitation} 
          declineInvitationCallBack = {declineInvitation}/>
      <DayCalendar eventsForMonth = {eventsForMonth(events, month)} month= {month}/>
      </LinearGradient>
      </View>
    );
}


//Month Data Ideally we would fetch this to allow for internationization
const monthData = [
        {
          label: "January"
        }, 
        {
          label: "Feburary"
        }, 
        {
          label: "March"
        }, 
        {
          label: "April"
        }, 
        {
          label: "May"
        }, 
        {
          label: "June"
        }, 
        {
          label: "July"
        }, 
        {
          label: "August"
        }, 
        {
          label: "Setember"
        }, 
        {
          label: "October"
        }, 
        {
          label: "November"
        }, 
        {
          label: "December"
        } 
    ]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  }
});
