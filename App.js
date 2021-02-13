import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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

export default function App() {
  
  const [language, setLanguage] = useState('English');
  const allLanguages = {
    English: 'English',
    Chinese: '中文'
  }
  const multilingual = {
    English: {
      headings: {
        yes: 'Common Recyclables',
        no: 'Common Not Recyclables'
      },
      recyclables: {
        plastic: 'Plastic',
        aluminum: 'Aluminum',
        cardboard: 'Cardboard',
      },
      nonrecyclables: {
        food: 'Food',
        styrofoam: 'Styrofoam',
        clothes: 'Clothes'
      }
    },
    Chinese: {
      headings: {
        yes: '可回收物',
        no: '不可回收物'
      },
      recyclables: {
        plastic: '塑料',
        aluminum: '铝箔',
        cardboard: '纸板',
      },
      nonrecyclables: {
        food: '食物',
        styrofoam: '发泡胶',
        clothes: '衣服'
      }
    }
  }
  useEffect(()=> {
    console.log(multilingual[language]['recyclables'].plastic)
    console.log(Object.keys(multilingual[language]['recyclables']))
    console.log('Language changed to', language)
  },[language])
  return (
    <View style={styles.container}>
      <Languages setLanguage={setLanguage} allLanguages={allLanguages}></Languages>

      <Text style={styles.headingGood}>{multilingual[language].headings.yes}:</Text>
      <View style={styles.group}>
        {Object.values(multilingual[language]['recyclables']).map(thing => {
          return <Text key={thing} style={styles.bullet}>{thing}</Text>
        })}
      </View>
      <Text style={styles.headingBad}>{multilingual[language].headings.no}:</Text>
      <View style={styles.group}>
        {Object.values(multilingual[language]['nonrecyclables']).map(thing => {
          return <Text key={thing} style={styles.bullet}>{thing}</Text>
        })}
      </View>
    </View>
  );
}

const heading =  {
  fontSize: 100,
  color: 'green',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  headingGood: {
    ...heading,
    color: 'green'
  },
  headingBad: {
    ...heading,
    color: 'red'
  },
  group: {
    flexDirection: 'column',
  },
  bullet: {
    fontSize: 50
  }
});
