import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Static imports (must match book folder names)
import genesis from '../assets/studyplan/genesis/index.json';
import exodus from '../assets/studyplan/exodus/index.json';
import leviticus from '../assets/studyplan/leviticus/index.json';
import numbers from '../assets/studyplan/numbers/index.json';
import deuteronomy from '../assets/studyplan/deuteronomy/index.json';
import joshua from '../assets/studyplan/joshua/index.json';
import judges from '../assets/studyplan/judges/index.json';
import ruth from '../assets/studyplan/ruth/index.json';
import onesamuel from '../assets/studyplan/onesamuel/index.json';
import twosamuel from '../assets/studyplan/twosamuel/index.json';
import onekings from '../assets/studyplan/oneking/index.json';
import twokings from '../assets/studyplan/twoking/index.json';
import onechronicles from '../assets/studyplan/onechronicles/index.json';
import twochronicles from '../assets/studyplan/twochronicles/index.json';
// import ezra from '../assets/studyplan/ezra';
import nehemiah from '../assets/studyplan/nehemiah/index.json';
import esther from '../assets/studyplan/esther/index.json';
import job from '../assets/studyplan/job/index.json';
import psalms from '../assets/studyplan/psalms/index.json';
import proverbs from '../assets/studyplan/proverbs/index.json';
import ecclesiastes from '../assets/studyplan/ecclesiastes/index.json';
import songofsolomon from '../assets/studyplan/songsofsolomo/index.json';
import isaiah from '../assets/studyplan/isaiah/index.json';
import jeremiah from '../assets/studyplan/jeremiah/index.json';
import lamentations from '../assets/studyplan/lamentations/index.json';
import ezekiel from '../assets/studyplan/ezekiel/index.json';
import daniel from '../assets/studyplan/daniel/index.json';
import hosea from '../assets/studyplan/hosea/index.json';
import joel from '../assets/studyplan/joel/index.json';
import amos from '../assets/studyplan/amos/index.json';
import obadiah from '../assets/studyplan/obadiah/index.json';
import jonah from '../assets/studyplan/jonah/index.json';
import micah from '../assets/studyplan/micah/index.json';
import nahum from '../assets/studyplan/nahum/index.json';
import habakkuk from '../assets/studyplan/habakkuk/index.json';
import zephaniah from '../assets/studyplan/zephaniah/index.json';
import haggai from '../assets/studyplan/haggai/index.json';
import zechariah from '../assets/studyplan/zechariah/index.json';
// import malachi from '../assets/studyplan/malachi/index.json';


import mark from '../assets/studyplan/mark/index.json';
import luke from '../assets/studyplan/luke/index.json';
import john from '../assets/studyplan/john/index.json';
import matthew from '../assets/studyplan/matthew/index.json'
import acts from '../assets/studyplan/acts/index.json';
import romans from '../assets/studyplan/romans/index.json';
import onecorinthians from '../assets/studyplan/onecorinthians/index.json';
import twocorinthians from '../assets/studyplan/twocorinthians/index.json';
import galatians from '../assets/studyplan/galatians/index.json';
import ephesians from '../assets/studyplan/ephesians/index.json';
import philippians from '../assets/studyplan/philippians/index.json';
import colossians from '../assets/studyplan/colossians/index.json';
import onethessalonians from '../assets/studyplan/onethessalonians/index.json';
import twothessalonians from '../assets/studyplan/twothessalonians/index.json';
import onetimothy from '../assets/studyplan/onetimothy/index.json';
import twotimothy from '../assets/studyplan/twotimothy/index.json';
import titus from '../assets/studyplan/titus/index.json';
import philemon from '../assets/studyplan/philemon/index.json';
import hebrews from '../assets/studyplan/hebrews/index.json';
import james from '../assets/studyplan/james/index.json';
import onepeter from '../assets/studyplan/onepeter/index.json';
import twopeter from '../assets/studyplan/twopeter/index.json';
import onejohn from '../assets/studyplan/onejohn/index.json';
import twojohn from '../assets/studyplan/twojohn/index.json';
import threejohn from '../assets/studyplan/threejohn/index.json';
import jude from '../assets/studyplan/jude/index.json';
import revelation from '../assets/studyplan/revelation/index.json';


const studyPlans: Record<string, any[]> = {
  // old testament
  genesis,
  exodus,
  leviticus,
  numbers,
  deuteronomy,
  joshua,
  judges,
  ruth,
  "1 samuel": onesamuel,
  "2 samuel": twosamuel,
  "1 kings": onekings,
  "2 kings": twokings,
  "1 chronicles": onechronicles,
  "2 chronicles": twochronicles,
  // ezra,
  nehemiah,
  esther,
  job,
  psalms,
  proverbs,
  ecclesiastes,
  "song of solomon": songofsolomon,
  isaiah,
  jeremiah,
  lamentations,
  ezekiel,
  daniel,
  hosea,
  joel,
  amos,
  obadiah,
  jonah,
  micah,
  nahum,
  habakkuk,
  zephaniah,
  haggai,
  zechariah,

  // new testament
  matthew,
  mark,
  luke,
  john,
  acts,
  romans,
  "1 corinthians": onecorinthians,
  "2 corinthians": twocorinthians,
  galatians,
  ephesians,
  philippians,
  colossians,
  "1 thessalonians": onethessalonians,
  "2 thessalonians": twothessalonians,
  "1 timothy": onetimothy,
  "2 timothy": twotimothy,
  titus,
  philemon,
  hebrews,
  james,
  "1 peter": onepeter,
  "2 peter": twopeter,
  "1 john": onejohn,
  "2 john": twojohn,
  "3 john": threejohn,
  jude,
  revelation,
};

export default function StudyPlan() {
  const { book } = useLocalSearchParams();
  console.log("BOOK", book)
  if (!book || typeof book !== 'string') {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No book specified.</Text>
      </View>
    );
  }

  const plan = studyPlans[book.toLowerCase()];
  if (!plan) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Study plan not found for "{book}".</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.header}>{book} Study Plan</Text>
      {plan.map((section, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.range}>{section.range}</Text>
          <Text style={styles.title}>{section.title}</Text>
          <Pressable
            key={index}
            style={styles.bookCard}
            onPress={() => router.push(`/studyverse?book=${book}&range=${section.range}`)}
          >
            <Text style={styles.bookText}>Begin</Text>
          </Pressable>

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#F3EAC2',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F3EAC2', // background for the full screen
  },
  header: {
    
    marginBottom: 20,
    color: '#3E4E40',
    textAlign: 'center',
    fontSize: 34,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  card: {
    backgroundColor: '#FAF3E0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  range: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5A7D63',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#3E4E40',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EAC2',
    padding: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  bookCard: {
    backgroundColor: '#A8BCA1',
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  bookText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
