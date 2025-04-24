import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';

import PlanComponent from '../../components/PlanComponent';
import { router } from 'expo-router';

export default function Start() {
  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Choose your plan</Text>

        <PlanComponent 
          url={require('../../assets/images/foundation.png')}
          title='Foundations Of The Bible'
          onPress={() => router.push('/courses')} 
          text='A simple journey through the foundational stories, teachings, and truths of God’s Word — perfect for beginners or anyone seeking a fresh start.'
        />
        <View style={styles.container}>
        <PlanComponent 
          url={require('../../assets/images/pray.png')}
          title='How To Pray'
          onPress={() => router.push('/prayer')} 
          text='Learn how to talk with God in a personal, meaningful way. This plan guides you through why prayer matters, what to say, and how to build a habit.'
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
  },
  overlay: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginBottom: 30,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  container:{
    marginTop:30
  }
});
