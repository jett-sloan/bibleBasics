import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native';

type Props = {
  url: ImageSourcePropType;
  title: string;
  text: string;

  onPress: () => void;
};

const PlanComponent = ({ url, title, text, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image source={url} style={styles.image} resizeMode="cover" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Begin your journey</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 500,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  imgcontainer: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: "#A8BCA1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlanComponent;
