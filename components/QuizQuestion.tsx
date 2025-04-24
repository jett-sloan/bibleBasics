import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizQuestion({ question, options, answer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsCorrect(option === answer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => {
        const isSelected = selected === option;
        const correct = isSelected && isCorrect === true;
        const incorrect = isSelected && isCorrect === false;

        return (
          <Pressable
            key={index}
            onPress={() => handleSelect(option)}
            style={[
              styles.option,
              correct && styles.correct,
              incorrect && styles.incorrect,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        );
      })}

      {selected && (
        <Text style={styles.feedback}>
          {isCorrect ? "✅ Correct!" : "❌ Try again!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E4E40",
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  correct: {
    borderColor: "green",
    backgroundColor: "#d4edda",
  },
  incorrect: {
    borderColor: "red",
    backgroundColor: "#f8d7da",
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#3E4E40",
  },
});
