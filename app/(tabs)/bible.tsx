import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Testimonal from '../../components/Testimonal';


export default function NewOrOld() {
 
  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
           <View style={styles.container}>
          <Testimonal
            title="New Testament"
            description="The New Testament introduces Jesus—His life, teachings, and sacrifice. It shares stories of hope and forgiveness, guiding new believers in growing their faith."
            type="new"
            url={require('../../assets/images/newtestament.png')}
          />
        </View> 

        <View style={styles.container}>
          <Testimonal
            title="Old Testament"
            description="The Old Testament reveals God’s story of creation, promises, and His relationship with His people. It prepares the way for Jesus through history, prophecy, and powerful lessons in faith."
            type="old"
            url={require('../../assets/images/oldtestament.png')}
          />
        </View> 
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
