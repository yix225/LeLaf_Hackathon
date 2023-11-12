// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image,FlatList} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import PostCard from './PostCard';
const baseUrl = 'https://api.multiavatar.com/';



// CardList.js




// UserComponent.js


const ProfileScreen = ({}) => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const user = global.USER;
    const { username, posts } = userData;


    axios.get('http://172.20.10.2:3000/profile',{
      },{ headers: { 'Content-Type': 'application/json' }})
      .then(function (response){
        const result = response.json();
        setUserData(result);
      })


    
  return (
    <View>
            <View>
        <Text>{`username: ${username}`}</Text>
        <FlatList
            data={posts || []}
            keyExtractor={(posts) => posts.postId.toString()}
            renderItem={({ item }) => (
            <Card
                username={item.username}
                content={item.content}
                postId={item.postId}
                comments={item.comments}
                types={item.types}
            />
            )}
        />
        </View>
       <Avatar
        size="xlarge"
        rounded
        
        source={{
          uri: baseUrl + global.USER + ".png" + "?apikey=NsZCLftT1y67Ex"}}
        
        // containerStyle={{left:135,marginBottom:650}}
        />
    </View>
  );
};

export default ProfileScreen;
