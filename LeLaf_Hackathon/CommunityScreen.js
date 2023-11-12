// A screen with different tabs on the left. Each tab opens up a forum post/text post section. 
import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


// axios.get('http://172.20.10.7:3000/allPosts/' + item.path)
//           .then(response => {
//             console.log('Response:', response.data);
//           })
//           .catch(error => {
//             console.log(error.response.data);
//           })
          

//navigation.navigate('Post')


const DATA = [
  {
    id: '20',
    title: 'All',
    path: 'all',
  },
  {
    id: '0',
    title: 'Family',
    path: 'family',
  },
  {
    id: '1',
    title: 'Career',
    path: 'career',
  },
  {
    id: '2',
    title: 'Relationships',
    path: 'relationship',
  },
  {
    id: '3',
    title: 'Personal',
    path: 'personal',
  },
  {
    id: '4',
    title: 'Home Sick',
    path: 'home_sick',
  },
  {
    id: '11',
    title: 'Financial',
    path: 'financial',
  },
  {
    id: '5',
    title: 'Lehigh University',
    path: 'lehigh',
  },
  {
    id: '6',
    title: 'Lafayette College',
    path: 'lafayette',
  },
  {
    id: '7',
    title: 'Northampton Community College',
    path: 'northampton',
  },
  {
    id: '8',
    title: 'Muhlenberg College',
    path: 'muhlenberg',
  },
  {
    id: '9',
    title: 'Moravian University',
    path: 'moravian',
  },
  {
    id: '10',
    title: 'Cedar Crest College',
    path: 'cedar',
  },
  {
    id: '12',
    title: 'DeSales University',
    path: 'desales',
  },
  {
    id: '13',
    title: 'Lehigh Carbon Community College',
    path: 'lehigh_carbon',
  },
  {
    id: '14',
    title: 'Kutztown University of Pennsylvania',
    path: 'kutztown',
  },

];


const Item = ({title}) => (
  <View style={styles.item}>
   <Text style={styles.title}>{title}</Text>

      
  </View>
);

const CommunityScreen = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
      <FlatList
         
        data={DATA}
        renderItem={({item}) => 
        <TouchableOpacity
        style={styles.item}
        onPress={() => 
          axios.get('http://172.20.10.2:3000/allPosts/' + item.path)
          .then(response => {
            console.log(response);
            global.pathpls = item.path;
            navigation.navigate('Post')
          })
          .catch(error => {
            console.log(error.response.data);
          })


        }
        
        
        >
       
      

        <Item style={styles.communityName} title={item.title} />
      </TouchableOpacity>
      
      
      }
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
