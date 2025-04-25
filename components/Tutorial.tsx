import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, Modal, Button, ImageBackground, StyleSheet, TouchableOpacity, } from 'react-native';

const TutorialPopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkTutorial = async () => {
            
          const lastOpened = await AsyncStorage.getItem('lastOpened');
          const now = Date.now();
      
          console.log("🧠 lastOpened:", lastOpened);
      
          const diffDays = lastOpened
            ? (now - parseInt(lastOpened)) / (1000 * 60 * 60 * 24)
            : null;
      
          if (!lastOpened || diffDays > 7) {
            console.log("📢 Showing tutorial (first time or 7+ days)");
            setShowPopup(true);
            await AsyncStorage.setItem('lastOpened', now.toString());
          } else {
            console.log(`⏳ Not enough days yet (${diffDays?.toFixed(2)}), skipping tutorial`);
          }
        };
      
        checkTutorial();
      }, []);
      
      

    const dismissPopup = async () => {
        setShowPopup(false);
        await AsyncStorage.setItem('lastOpened', Date.now().toString());
    };

    return (
        <Modal visible={showPopup} transparent animationType="fade">
            <View  style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground
                    source={require("../assets/images/popup.png")}
                    style={styles.background}
                    resizeMode="cover"
                >

                </ImageBackground>

                <TouchableOpacity onPress={dismissPopup} style={styles.button}>
                    <Text style={styles.buttonText}>Got it!</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

export default TutorialPopup;

const styles = StyleSheet.create({
    background: {
        width: 350,
        height: 600,
        borderRadius: 20,
        overflow: 'hidden', // 👈 This makes the borderRadius actually show!
      },
      
    button: {
        backgroundColor: '#A97C50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      }

      
      
})
