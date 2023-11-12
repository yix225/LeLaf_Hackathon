// Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>title</Text>
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Card;
