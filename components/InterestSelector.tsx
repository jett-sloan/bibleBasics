import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  label: string;
  options: string[];
  responses?: Record<string, string>;
};

export default function InterestSelector({ label, options, responses = {} }: Props) {
  const [selected, setSelected] = useState('');

  const generateFallbackMessage = (choice: string) => {
    return `Great! We'll walk with you as you explore: ${choice}.`;
  };

  const message = selected
    ? responses[selected] || generateFallbackMessage(selected)
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => setSelected(option)}
          style={[
            styles.option,
            selected === option && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
      {message && (
        <Text style={styles.feedback}>
          ✅ {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#3E4E40',
  },
  option: {
    backgroundColor: '#EFE9D3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#A4C3B2',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#A4C3B2',
  },
  optionText: {
    fontSize: 16,
    color: '#3E4E40',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#3E4E40',
  },
});
