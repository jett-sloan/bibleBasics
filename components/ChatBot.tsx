import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
interface Message {
  sender: 'user' | 'bot';
  text: string;
}
type ChatBotProps = {
  currentRange: string;
};
export default function ChatBot({ currentRange }: ChatBotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!input) return;
  
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
  
    try {
      const response = await axios.post('https://my-proxy.jettsloansloan.workers.dev/chat', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful Bible study assistant for beginner Christians. You hold to a 5-point Calvinist view of theology. The user is currently reading ${currentRange}. If they ask questions, assume they are related to this passage unless they say otherwise. Use simple, friendly language, avoid complex theology, and focus on clarity, encouragement, and basic understanding of Scripture, cultural context, and key terms.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      });
  
      const reply = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong' }]);
    }
  };
  
  const clearChat = () => {
    setMessages([]);
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setIsVisible(true)}>
        <Image
          source={require('../assets/images/chatbot.png')}
          style={styles.image}
          resizeMode="cover"
        >
        </Image>

      </TouchableOpacity>

      {/* Chat Modal */}

      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>

        <View style={styles.modal}>
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.header}>Bible Chat</Text>
            <TouchableOpacity onPress={clearChat} style={styles.clearButton} >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <View style={styles.inputRow}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask a question"
                style={styles.input}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>

            {messages.map((msg, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <Text style={styles.senderLabel}>
                  {msg.sender === 'user' ? 'You:' : 'Bot:'}
                </Text>
                <View
                  style={[
                    styles.messageBase,
                    msg.sender === 'user' ? styles.userMsg : styles.botMsg
                  ]}
                >
                  <Text
                    style={[
                      styles.textBase,
                      msg.sender === 'user' ? styles.userText : styles.botText
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>


        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3E4E40',
    width: 70,
    height: 70,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    zIndex: 1000,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35, // round it if the image isn’t already circular
  },
  modal: {
    backgroundColor: '#f8f4e3',
    padding: 20,
    height: '60%',
    borderRadius: 10,
  },

  senderLabel: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white', // or customize: 'blue' for user, 'green' for bot, etc.
  },
  messageBase: {
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start', // ensures bubble wraps content by default
  },

  userMsg: {
    backgroundColor: '#F5DDBC',
    alignSelf: 'flex-end', // optional, aligns user messages to the right
    maxWidth: '80%',       // limits really long messages
    alignItems: 'flex-start',
  },

  botMsg: {
    backgroundColor: '#F5DDBC',

  },
  textBase: {
    fontSize: 16,
  },
  userText: {
    color: 'black',
  },
  botText: {
    color: 'black',
  },
  header: {
    color: "#4f6f52",
    fontSize: 23,
    textAlign: 'center',
    fontFamily:"Georgia"
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    marginRight: 10,
  },
  
  sendButton: {
    backgroundColor: '#4f6f52', // deep earthy green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#F55D5D', // Red color for the clear button
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
