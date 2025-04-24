import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Testimonal from '../components/Testimonal';


export default function course() {
 
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
          <Testimonal
            title="The Basics Of The Bible"
            description="The Bible Basics course explains God’s story from beginning to end, helping you understand His message without reading every chapter."
            type="basics"
            url={require('../assets/images/thebasics.png')}
          />
        </View>
        
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 100,
  },
  container: {
    alignItems: 'center',
    marginBottom: 50,
  },
});
