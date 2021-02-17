import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { multilingual, images, badImages } from './utils/data';

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

      <TouchableOpacity  style={{height: 90, width: 300, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 5,
      borderStyle: 'solid', borderColor: 'black', textAlign: 'center'}}
        onPress={()=>setLanguage(myLanguage)}>
        <Text style={{fontSize: 60}}>
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
      fontSize: 20,
      marginRight: 30,
      padding: 30,
      alignItems: 'center'}}>
      <Text style={{fontSize: '5vh'}}>{item}</Text>
      <Image 
        source={image}
        style={{
          height: 200, 
          borderWidth: 1,
          width: 200}}
        >
      </Image>
    </View>
  )
}

export default function App() {
  
  const [language, setLanguage] = useState('English');
  const allLanguages = {
    English: 'English',
    Chinese: '中文',
    Spanish: 'Español'
  }

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
    width: 1200,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    padding: 25,   
  },
  bullet: {
    fontSize: 30
  }
});
