import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { studyContent } from '../constants/studyContent';
import { imageMap } from '../constants/imageMap';
import ChatBot from '../components/ChatBot'
import ContinueButton from '../components/ContinueButton'; // adjust the path if needed
import ChapterInsights from '../components/ChapterInsights'; // adjust path if needed
import TutorialPopup from 'components/Tutorial';

const BASE_URL = 'https://my-proxy.jettsloansloan.workers.dev/bible';



const bookCodes: Record<string, string> = {
  genesis: 'GEN',
  exodus: 'EXO',
  leviticus: 'LEV',
  numbers: 'NUM',
  deuteronomy: 'DEU',
  joshua: 'JOS',
  judges: 'JDG',
  ruth: 'RUT',
  '1 samuel': '1SA',
  '2 samuel': '2SA',
  '1 kings': '1KI',
  '2 kings': '2KI',
  '1 chronicles': '1CH',
  '2 chronicles': '2CH',
  ezra: 'EZR',
  nehemiah: 'NEH',
  esther: 'EST',
  job: 'JOB',
  psalms: 'PSA',
  proverbs: 'PRO',
  ecclesiastes: 'ECC',
  'song of solomon': 'SNG',
  isaiah: 'ISA',
  jeremiah: 'JER',
  lamentations: 'LAM',
  ezekiel: 'EZK',
  daniel: 'DAN',
  hosea: 'HOS',
  joel: 'JOL',
  amos: 'AMO',
  obadiah: 'OBA',
  jonah: 'JON',
  micah: 'MIC',
  nahum: 'NAM',
  habakkuk: 'HAB',
  zephaniah: 'ZEP',
  haggai: 'HAG',
  zechariah: 'ZEC',
  malachi: 'MAL',
  matthew: 'MAT',
  mark: 'MRK',
  luke: 'LUK',
  john: 'JHN',
  acts: 'ACT',
  romans: 'ROM',
  '1 corinthians': '1CO',
  '2 corinthians': '2CO',
  galatians: 'GAL',
  ephesians: 'EPH',
  philippians: 'PHP',
  colossians: 'COL',
  '1 thessalonians': '1TH',
  '2 thessalonians': '2TH',
  '1 timothy': '1TI',
  '2 timothy': '2TI',
  titus: 'TIT',
  philemon: 'PHM',
  hebrews: 'HEB',
  james: 'JAS',
  '1 peter': '1PE',
  '2 peter': '2PE',
  '1 john': '1JN',
  '2 john': '2JN',
  '3 john': '3JN',
  jude: 'JUD',
  revelation: 'REV'
};

export default function StudyVerse() {
  const { book, range } = useLocalSearchParams();
  const [chapterBlocks, setChapterBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  console.log('this the range im on',range)
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const bookKey = (book as string).toLowerCase();
        const bookCode = bookCodes[bookKey];
        if (!bookCode) return;

        const chapterNums = range?.toString().match(/\d+/g);
        if (!chapterNums) return;

        const start = Number(chapterNums[0]);
        const end = Number(chapterNums[chapterNums.length - 1]);

        const fetchedChapters = [];

        for (let i = start; i <= end; i++) {
          const chapterId = `${bookCode}.${i}`;
          const res = await axios.get(`${BASE_URL}?chapterId=${chapterId}`);


          const content = res.data?.data?.content;
          const extras = studyContent[bookKey]?.[`${i}`] ?? null;
          const imageKey = `${bookKey}${i}`;
          const image = imageMap[imageKey];

          if (content) {
            fetchedChapters.push({
              chapter: `${bookCode} ${i}`,
              html: content,
              summary: extras?.summary,
              image: image ?? null,
              title: extras?.title
            });

          }
        }

        setChapterBlocks(fetchedChapters);
      } catch (err) {
        console.warn('Error fetching chapters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [book, range]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <View style={{ flex: 1 }}>
      
    <ScrollView style={{ backgroundColor: '#F3EAC2' }} contentContainerStyle={{ padding: 20 }}>
    <TutorialPopup/>
      {chapterBlocks.map((chapter, index) => (
        <View key={index} style={{ marginBottom: 40 }}>
          {/* Optional image */}
          {chapter.image && (
            <Image
              source={chapter.image}
              style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 20 }}
              resizeMode="cover"
            />
          )}
          <Text style={styles.sectionTitle}>{chapter.title}</Text>
          <Text style={styles.sectionTitle}>{chapter.chapter}</Text>
          <RenderHtml contentWidth={width} source={{ html: chapter.html }} baseStyle={styles.bibleText} />

          {chapter.summary && (
            <>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summary}>{chapter.summary}</Text>
            </>
          )}
          <ChapterInsights chapterContent={chapter.html} />

        </View>
        
      ))}
          <ContinueButton
  book={book as string}
  range={range as string}
/>
    </ScrollView>
    <ChatBot currentRange={Array.isArray(range) ? range[0] : range} />


    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#3E4E40',
  },
  summary: {
    fontSize: 16,
    lineHeight: 26,
    color: '#3E4E40',
    textAlign: 'justify',
  },
  bibleText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#3E4E40',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EAC2',
  },
});
