// A screen with different tabs on the left. Each tab opens up a forum post/text post section. Users can click + button to add a new post
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Other Screen</Text>
      
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
  
});

export default CommunityScreen;
