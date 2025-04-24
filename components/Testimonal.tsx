import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
    title: string;
    description: string;
    type: 'new' | 'old' | 'basics' ;
    url: ImageSourcePropType;
};

export default function Testimonal({ title, description, type, url }: Props) {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push(`/booklist?type=${type}`);
    };
    return (
        <View >
            <View style={styles.container}>
                <View style={styles.imgcontainer}>
                    <Image
                        source={url}
                        style={styles.image}
                        resizeMode="cover"
                    />

                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Pressable style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Begin your journey</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '80%',
        height: 405,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    imgcontainer: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 20,
        backgroundColor: '#A8BCA1',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3E4E40',
        textAlign: 'center',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#3E4E40',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "#A8BCA1",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 15
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
