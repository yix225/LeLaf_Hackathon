// A screen with different tabs on the left. Each tab opens up a forum post/text post section. 
import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const DATA = [
  {
    id: '0',
    title: 'Family',
  },
  {
    id: '1',
    title: 'Career',
  },
  {
    id: '2',
    title: 'Relationships',
  },
  {
    id: '3',
    title: 'Personal',
  },
  {
    id: '4',
    title: 'Home Sick',
  },
  {
    id: '11',
    title: 'Financial',
  },
  {
    id: '5',
    title: 'Lehigh University',
  },
  {
    id: '6',
    title: 'Lafayette College',
  },
  {
    id: '7',
    title: 'Northampton Community College',
  },
  {
    id: '8',
    title: 'Muhlenberg College',
  },
  {
    id: '9',
    title: 'Moravian University',
  },
  {
    id: '10',
    title: 'Cedar Crest College',
  },
  {
    id: '12',
    title: 'DeSales University',
  },
  {
    id: '13',
    title: 'Lehigh Carbon Community College',
  },
  {
    id: '14',
    title: 'Kutztown University of Pennsylvania',
  },

];


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <FlatList
         
        data={DATA}
        renderItem={({item}) => <Item style={styles.communityName} title={item.title} />}
        keyExtractor={item => item.id}
      />
      
      
        
      
      
    </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 0,
  },

communityName:{
  fontFamily: 'Helvetica Neue',
  fontSize: 20,
  justifyContent: 'center',
  
 
} ,

  
});

export default CommunityScreen;
