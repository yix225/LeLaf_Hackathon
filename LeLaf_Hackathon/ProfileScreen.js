// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

const baseUrl = 'https://api.multiavatar.com/';



const ProfileScreen = () => {
    const navigation = useNavigation();
   
  return (
    <View style={styles.container}>
         <Avatar
        size="xlarge"
        rounded
        
        source={{
          uri: baseUrl + global.USER + ".png" + "?apikey=NsZCLftT1y67Ex"}}
        
        containerStyle={{left:135,marginBottom:650}}
      />
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  image: {
    width: 150, // Set your desired width
    height: 150, // Set your desired height
    resizeMode: 'cover', // Adjust the resizeMode as needed (cover, contain, stretch, etc.)
    borderRadius: 8, // Add border radius if desired
  },
});

export default ProfileScreen;


// ... rest of the code
