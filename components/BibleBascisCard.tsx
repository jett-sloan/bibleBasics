// Card.tsx
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from 'react-native';

interface CardProps {
  title: string;
  text: string;
  url: ImageSourcePropType;
  kind: string; // <-- new prop to navigate correctly
}

const BibleBasicsCard: React.FC<CardProps> = ({ title, text, url, kind }) => {

  
  return (
    <View style={styles.card}>
      {url && <Image  source={url} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Pressable style={styles.button} onPress={() => router.push(`/biblebasics?book=${kind}`)}>
    <Text style={styles.buttonText}>Begin your journey →</Text>
  </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBE6',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    height:440,
    width:300
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E4E40',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3E4E40',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: "#A8BCA1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 15,
    width:215
},
buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
},
});

export default BibleBasicsCard;
