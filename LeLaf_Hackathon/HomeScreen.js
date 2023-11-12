// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('/Users/athens/LeLaf_Hackathon/LeLaf_Hackathon/bg.png')}
      style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Connected</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Go to Login Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Communities')}
      >
        <Text style={styles.buttonText}>Go to Community Screen</Text>
      </TouchableOpacity>
    </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginBottom: 50,
    fontWeight: 'bold',
    color: 'pink',
    textShadowColor: '#300040',
    textShadowOffset: { width: 5, height: 1 },  // Offset of the frame
    textShadowRadius: 3, 

  },
  button: {
    backgroundColor: '#300040',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
