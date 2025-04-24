// components/ContinueButton.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { studyPlans } from '../constants/studyPlan';
 // wherever your studyPlans object lives

interface Props {
  book: string;
  range: string;
}

export default function ContinueButton({ book, range }: Props) {
  const bookKey = book.toLowerCase();
  const plan = studyPlans[bookKey];
  const currentIndex = plan?.findIndex(p => p.range === range);
  const next = plan?.[currentIndex + 1];

  if (!next) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
      <Text style={styles.upnext}>Up next:</Text>
         {next.range} – {next.title}
      </Text>
      <Pressable
        onPress={() =>
          router.push(`/studyverse?book=${book}&range=${next.range}`)
        }
        style={styles.button}
      >
       <Text style={styles.buttonText}>Continue →</Text>

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F3EAC2',
    marginBottom: 50
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#3E4E40',
  },
  button: {
    backgroundColor: '#A8BCA1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    width:"50%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upnext:{
    color: '#3E4E40',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:50
  }
});
