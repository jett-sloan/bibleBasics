import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BibleBascisCard from '../components/BibleBascisCard';
import { categorizedNewTestament, categorizedOldTestament } from '../constants/categorizedTestament';
const iconMap: Record<string, any> = {
  'gospels.png': require('../assets/images/gospels.png'),
  'church.png': require('../assets/images/church.png'),
  // 'paul.png': require('../assets/icons/paul.png'),
  'letters.png': require('../assets/images/epistles.png'),
  'revelation.png': require('../assets/images/eternal.png'),
  // 'scroll.png': require('../assets/icons/scroll.png'),
  // 'prophet.png': require('../assets/icons/prophet.png'),
  // 'scroll-small.png': require('../assets/icons/scroll-small.png'),
  // 'wisdom.png': require('../assets/icons/wisdom.png'),
  // 'history.png': require('../assets/icons/history.png'),
  'law.png': require('../assets/images/law.png'),
  'history.png':require('../assets/images/history.png'),
  'mega.png':require('../assets/images/mega.png'),
  'wisdom.png':require('../assets/images/wisdom.png'),
  'prophet.png':require('../assets/images/prophet.png'),

  // Difficulty icons
  'easy.png': require('../assets/images/easy.png'),
  'meduim.png': require('../assets/images/meduim.png'),
  'hard.png': require('../assets/images/hard.png'),
};

export default function BookList() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  const typeKey = type?.toString() as 'old' | 'new' | 'basics';

  if (!['old', 'new', 'basics'].includes(typeKey)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Invalid or missing category.</Text>
      </View>
    );
  }

  const getHeader = () => {
    switch (typeKey) {
      case 'old':
        return 'Old Testament';
      case 'new':
        return 'New Testament';
      case 'basics':
        return 'Bible Basics';
      default:
        return '';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{getHeader()}</Text>

      {/* Bible Basics View */}
      {typeKey === 'basics' && (
        <>
          <BibleBascisCard kind='what is the bible' title='What is the Bible?' text='A brief introduction to the Bible as the sacred text of Christianity, comprising the Old and New Testaments, and how it serves as a guide for faith and life.' url={require('../assets/images/whatisthebible.png')} />
          <BibleBascisCard kind='big story' title='The Big Story' text='An overview of the Bible’s overarching narrative, from God’s creation of the world to the ultimate restoration and renewal of all things through Christ.' url={require('../assets/images/bigstory.png')} />
          <BibleBascisCard kind='old testament' title='Old Testament in a Nutshell' text='A snapshot of the Old Testament, covering the key events, laws, and prophecies that lay the foundation for the coming of the Messiah.' url={require('../assets/images/oldtestamentns.png')} />
          <BibleBascisCard kind='new testament' title='New Testament in a Nutshell' text='A quick look at the New Testament, focusing on the life and teachings of Jesus Christ and the early church’s mission to spread the Gospel.' url={require('../assets/images/newtestamentns.png')} />
          <BibleBascisCard kind='how to read the bible' title='How to Read the Bible' text='A brief guide on how to approach reading the Bible, with tips on understanding its messages, context, and how to apply it to your life.' url={require('../assets/images/howtoread.png')} />
        </>
      )}

      {/* Organized Bible Book Sections */}
      {typeKey !== 'basics' && (
        (typeKey === 'old' ? categorizedOldTestament : categorizedNewTestament).map((section, i) => {

          return (
            <View key={i} style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Image source={iconMap[section.icon]} style={styles.icon} />
                <Text style={styles.sectionTitle}>{section.category}</Text>
              </View>

              {section.books.map((book, j) => (
                <Pressable
                  key={j}
                  style={styles.bookCard}
                  onPress={() => router.push({ pathname: '/studyplan', params: { book: book.name } })}
                >
                  <View style={styles.bookRow}>
                    <Text style={styles.bookText}>{book.name}</Text>
                    <Image source={iconMap[`${book.difficulty}.png`]} style={styles.difficultyIcon} />
                  </View>
                </Pressable>
              ))}
            </View>
          );
        })
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  header: {
    marginBottom: 30,
    color: '#3E4E40',
    fontSize: 34,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  section: {
    marginBottom: 30,
    width: '100%',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#3E4E40',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  bookCard: {
    backgroundColor: '#A8BCA1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  bookText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 44,
    height: 44,
  },
  difficultyIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  }
});
