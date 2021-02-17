import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { multilingual, images, badImages } from './utils/data';
import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgnaKNGyhSoRc5GZNY_pVvvuK-6wkTVR4",
  authDomain: "green-trails.firebaseapp.com",
  databaseURL: "https://green-trails-default-rtdb.firebaseio.com",
  projectId: "green-trails",
  storageBucket: "green-trails.appspot.com",
  messagingSenderId: "70270350324",
  appId: "1:70270350324:web:4982e36004861a91d3bfa1",
  measurementId: "G-4Y4W93HVHF"
};

firebase.initializeApp(firebaseConfig);



const Languages = ({allLanguages, setLanguage}) => {
  return (
    
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {Object.keys(allLanguages).map(language => {
        return <Language allLanguages={allLanguages} key={language} setLanguage={setLanguage} myLanguage={language}></Language>
      })}
    </View>
  )
}
const Language = ({setLanguage, myLanguage, allLanguages}) => {

  return (

      <TouchableOpacity  style={{height: '10vh', width: '20vw', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 5,
      borderStyle: 'solid', borderColor: 'black', textAlign: 'center'}}
        onPress={()=>setLanguage(myLanguage)}>
        <Text style={{fontSize: '3vh'}}>
          {allLanguages[myLanguage]}
        </Text>
      </TouchableOpacity>
  )
}

const Card = ({item, image}) => {
  return (
    <View style={{
      flexDirection: 'column', 
      justifyContent: 'space-evenly', 
      textAlign: 'center',
      fontSize: '3vh',
      marginRight: '3vw',
      padding: '5vh',
      alignItems: 'center'}}>
      <Text style={{fontSize: '5vh'}}>{item}</Text>
      <Image 
        source={image}
        style={{
          height: '22vh', 
          borderWidth: 1,
          width: '18vw'}}
        >
      </Image>
    </View>
  )
}

export default function App() {
  
  const [language, setLanguage] = useState('English');
  const [count, setCount] = useState(0);
  const [stop, setStop] = useState(null);
  const allLanguages = {
    English: 'English',
    Chinese: '中文',
    Spanish: 'Español',
    Polish: 'Polskie'
  }

  

  function writeUserData() {
    firebase.database().ref('novisitors').set({
      count: count + 1
    });
  }
  
  useEffect(()=> {
    if (count && !stop) {
      writeUserData();
      setStop(true);
    }
  },[count, stop]);

  useEffect(() => {
    const db = firebase.database().ref("novisitors");
    const handleData = (snap) => {
      if (snap.val()) {
        console.log(snap.val());
        setCount(snap.val().count);
      }
    };
    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);





  return (
    <View style={styles.container}>
      <Languages setLanguage={setLanguage} allLanguages={allLanguages}></Languages>
      <Text style={styles.headingGood}>{multilingual['languages'][language].headings.yes}:</Text>
      <View style={styles.group}>
        {Object.values(multilingual['languages'][language]['recyclables']).map((thing, index) => {
          console.log("Thing:", thing);
          return <Card key={thing} image={images[index]} item={thing}/>
        })}
      </View>
      <Text style={styles.headingBad}>{multilingual['languages'][language].headings.no}:</Text>
      <View style={styles.group}>
        {Object.values(multilingual['languages'][language]['nonrecyclables']).map((thing, index) => {
          return <Card key={thing} image={badImages[index]} item={thing}/>
        })}
      </View>
    </View>
  );
}

const heading =  {
  fontSize: '10vh',
  color: 'green',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll'

  },
  headingGood: {
    ...heading,
    color: 'green',
  },
  headingBad: {
    ...heading,
    color: 'red'
  },
  group: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    width: '80vw',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    padding: '5vw',   
  },
  bullet: {
    fontSize: '5vh'
  }
});
