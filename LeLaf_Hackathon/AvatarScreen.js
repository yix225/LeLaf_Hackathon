import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AvatarScreen = () => {
  const [imageData, setImageData] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await fetch('https://api.example.com/https://api.multiavatar.com/Starcrasher.png?apikey=YNsZCLftT1y67Ex', {
        method: 'GET',
        headers: {
          // Add headers if needed
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        setImageData(URL.createObjectURL(blob));
      } else {
        console.error('GET request failed');
      }
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      {imageData && <Image source={{ uri: imageData }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default AvatarScreen;
