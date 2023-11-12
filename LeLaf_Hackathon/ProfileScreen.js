// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image,FlatList} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Card from './Card';
import { fetchData } from './api';
const baseUrl = 'https://api.multiavatar.com/';



// CardList.js



const ProfileScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        setData(result); // assuming result is an array of objects with 'title' and 'content'
      } catch (error) {
        // Handle error
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <View>
        <Avatar
        size="xlarge"
        rounded
        
        source={{
          uri: baseUrl + global.USER + ".png" + "?apikey=NsZCLftT1y67Ex"}}
        
        containerStyle={{left:135,marginBottom:650}}
        />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // adjust the key as per your data structure
        renderItem={({ item }) => (
          <Card title={item.title} content={item.content} />
        )}
      />
    </View>
  );
};

export default ProfileScreen;
