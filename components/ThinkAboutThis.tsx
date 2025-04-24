import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ThinkAboutBot from "./ThinkAboutBot";

type Scripture = { reference: string; text: string };

type Props = {
  question: string;
  scripture: Scripture;
  prompt: string;
  inputPlaceholder?: string;
};

export default function ThinkAboutThis({
  question,
  scripture,
  prompt,
  inputPlaceholder = "What stands out to you?",
}: Props) {
  const [focused, setFocused] = useState(false);
  const [note, setNote]       = useState("");
  const [showBot, setShowBot] = useState(false);   // 👉 controls when ChatBot appears

  const handleSubmit = () => {
    if (!note.trim()) return;       // ignore empty
    setShowBot(true);               // now render ChatBot
  };

  return (
    <View style={[styles.card, focused && { marginBottom: 300 }]}>
      <Text style={styles.question}>{question}</Text>

      <Text style={styles.scriptureRef}>{scripture.reference}</Text>
      <Text style={styles.scriptureText}>{scripture.text}</Text>

      <Text style={styles.prompt}>{prompt}</Text>

      <TextInput
        value={note}
        onChangeText={setNote}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={inputPlaceholder}
        placeholderTextColor="#666"
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnTxt}>Submit</Text>
      </TouchableOpacity>

      {/* 👇 ChatBot appears only after Submit */}
      {showBot && (
        <ThinkAboutBot
          seedQuestion={inputPlaceholder}    // or scripture.text if that’s the prompt you want
          firstUserReply={note.trim()}
        />
      )}
    </View>
  );
}

/* ------------- styles (unchanged) ------------- */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EFE9D3",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  question: {
    fontSize: 22,
    color: "#3E4E40",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "PlayfairDisplay-Regular",
  },
  scriptureRef: {
    fontWeight: "600",
    fontSize: 16,
    color: "#4B6043",
    textAlign: "center",
  },
  scriptureText: {
    fontStyle: "italic",
    color: "#444",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  prompt: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    minHeight: 60,
    color: "#222",
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#A4C3B2",
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  btnTxt: {
    color: "#fff",
    fontWeight: "600",
  },
});
