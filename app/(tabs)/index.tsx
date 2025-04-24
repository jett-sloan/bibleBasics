import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '../../components/Themed'; // adjust if you moved Themed.tsx

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/plan');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homepagebg.png')} // make sure this image exists
      style={styles.container}
      resizeMode="cover"
    >
      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.text}>Get Started</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 100,
    backgroundColor: '#A8BCA1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
