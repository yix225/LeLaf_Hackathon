// PostCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCard = ({ username, content, postId, comments, types }) => {
  return (
    <View style={styles.card}>
      <Text>{`Post ID: ${postId}`}</Text>
      <Text>{`Username: ${global.USER}`}</Text>
      <Text>{`Content: ${content}`}</Text>
      {/* Display comments, types, or any other post details as needed */}
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
});

export default PostCard;
