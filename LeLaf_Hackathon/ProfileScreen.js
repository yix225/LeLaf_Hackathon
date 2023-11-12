// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image,FlatList} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import PostCard from './PostCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
const baseUrl = 'https://api.multiavatar.com/';



// CardList.js




// UserComponent.js


const ProfileScreen = ({}) => {
    const navigation = useNavigation();
    // const [userData, setUserData] = useState(null);
    const [profile, setProfile] = useState([]);
    // const user = global.USER;
    // const { username, posts } = userData;


    // axios.get('http://172.20.10.11:3000/profile',{
    //   },{ headers: { 'Content-Type': 'application/json' }})
    //   .then(function (response){
    //     const result = response.json();
    //     setUserData(result);
    //   })
    // Function to fetch posts
    const renderProfile = () => {
      return profile.map((pro) => (
        <Card key={pro.postId}>
          <Card.Title>New Post</Card.Title>
          <Card.Divider/>
          <Text>{pro.posts}</Text>
        </Card>
      ));
    };
  const fetchProfile = async () => {
    try {
      // Replace this with your actual logic to fetch posts from an API
      const response = await fetch('http://172.20.10.11:3000/pofile/');
      console.log('response');
      console.log(response);
      const data = await response.json();
      console.log('data');
      console.log(data);

      setProfile(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Effect to fetch posts when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []); 

    
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>
      {renderProfile()}
    </ScrollView>
      
    <View>
        {/* Replace 'username' with the correct variable */}
        <Text>{`username: ${global.USER}`}</Text>
        <FlatList
          data={profile[0]?.posts || []}
          keyExtractor={(item) => item.postId.toString()}
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
        
         containerStyle={{left:110,marginBottom:1250}}
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
  title: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#CF9FFF', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
  },
});

export default ProfileScreen;
