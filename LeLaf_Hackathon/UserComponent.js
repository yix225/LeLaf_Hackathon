// UserComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import PostCard from './PostCard'; // Assume you have a Card component

const UserComponent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        setUserData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error setting user data:', error);
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  const { username, posts } = userData;

  return (
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
  );
};

export default UserComponent;
