// ChatBot.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';


type ChatBotProps = {
  seedQuestion: string;   // the prompt from your JSON
  firstUserReply: string; // learner’s initial answer
};

export default function ChatBot({ seedQuestion, firstUserReply }: ChatBotProps) {

  const [botReply, setBotReply] = useState<string | null>(null);

  useEffect(() => {

    (async () => {

      const res = await axios.post(
        'https://my-proxy.jettsloansloan.workers.dev/chat',
        {


          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a friendly Bible‑study helper who holds to a five‑point Calvinist view of theology. Answer every question in simple, sweet, and encouraging language.',
            },
            {
              role: 'user',
              content: seedQuestion,
            },
            {
              role: 'user',
              content: firstUserReply,
            },
          ],


        });
      const data = res.data;

      const content =
        data.choices?.[0]?.message?.content?.trim() ||
        "I’m not sure how to answer that yet.";
      setBotReply(content);
    })();
  }, [seedQuestion, firstUserReply]);

  if (!botReply) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.replyBox}>
      <Text style={styles.reply}>{botReply}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { padding: 12, alignItems: 'center' },
  replyBox: { backgroundColor: '#EFE9D3', padding: 12, borderRadius: 8 },
  reply: { color: '#3E4E40', fontSize: 16 },
});
