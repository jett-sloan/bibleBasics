import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import axios from 'axios';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const questions = [
  "What cultural norms or customs were at play in this chapter? If multiple, then explain.",
  "How does this chapter fit into the bigger picture of the Bible?",
  "How does this chapter connect the Old and New Testaments?",
  "How is this chapter relevant to life today?",
  "What does this chapter teach us about God's character?"
];

export default function ChapterInsights({ chapterContent }: { chapterContent: string }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const results = [];

        for (const q of questions) {
          const res = await axios.post('https://my-proxy.jettsloansloan.workers.dev/chat', {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a biblical scholar guiding a new believer in understanding scripture. You hold to a 5-point Calvinist view of theology. Keep your answers short, very simple, and easy to understand, like you're explaining it to someone new to the Bible."
              },
              {
                role: "user",
                content: `Based on this chapter: ${chapterContent}\n\n${q}`
              }
            ]
          });
          

          results.push(res.data.choices[0].message.content);
        }

        setAnswers(results);
      } catch (err) {
        console.error("Failed to get AI responses:", err);
        setAnswers(["Could not fetch insights."]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [chapterContent]);

  const toggleAnswer = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cultural & Spiritual Insights</Text>
      {questions.map((q, i) => (
        <View key={i} style={styles.item}>
          <Pressable onPress={() => toggleAnswer(i)}>
            <Text style={styles.question}>
              {openIndex === i ? '▼' : '▶'} Q{i + 1}. {q}
            </Text>
          </Pressable>
          {openIndex === i && <Text style={styles.answer}>{answers[i]}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E4E40',
  },
  item: {
    marginBottom: 15,
    backgroundColor: '#f8f4e3',
    padding: 12,
    borderRadius: 8,
  },
  question: {
    fontWeight: 'bold',
    color: '#5A7D63',
    fontSize: 16,
  },
  answer: {
    marginTop: 10,
    color: '#3E4E40',
    fontSize: 15,
  },
});
