// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const SERVER_URL = 'http://172.20.10.2:3000'; // Replace with your Flask server URL
const baseUrl = 'https://api.multiavatar.com/';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleLogin = async () => {   
      console.log(username);
      console.log(password);
      axios.post('http://172.20.10.2:3000/login', {
        username:username, password:password
      },{ headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
          console.log(response);
          global.USER = username;
          navigation.navigate('Communities');
      })
      .catch(function (error) {
          console.log(error.response.data);
      }); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: baseUrl + username + ".png" + "?apikey=NsZCLftT1y67Ex"}}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>{message}</Text>
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

export default LoginScreen;


// ... rest of the code
