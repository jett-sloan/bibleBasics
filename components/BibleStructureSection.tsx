import { View, Text, Image, StyleSheet } from 'react-native';

type Block = {
  title: string;
  icon: string;
  description: string;
};

type Props = {
  blocks: Block[];
};

const iconMap: Record<string, any> = {
  "law.png": require("../assets/images/law.png"),
  "history.png": require("../assets/images/history.png"),
  "wisdom.png": require("../assets/images/wisdom.png"),
  "prophets.png": require("../assets/images/prophets.png"),
  "gospels.png": require("../assets/images/gospels.png"),
  "acts.png": require("../assets/images/acts.png"),
  "letters.png": require("../assets/images/epistles.png"),
  "revelation.png":require("../assets/images/revelations.png"),
  "authority.png":require("../assets/images/authory.png"),
  "inspiration.png":require("../assets/images/inspiration.png"),
  "growth.png":require("../assets/images/growth.png"),
  "bible.png": require("../assets/images/bible.png"),
  "scrolls.png": require("../assets/images/scrolls.png"),
  "light.png": require("../assets/images/light.png"),
  "map.png": require("../assets/images/map.png"),
  
  "creation.png": require("../assets/images/creation.png"),
  "fall.png":require("../assets/images/fall.png"),
  "redemption.png":require("../assets/images/redemption.png"),
  "restoration.png":require("../assets/images/restoration.png"),
  "earth.png":require("../assets/images/earth.png"),
  "people.png":require("../assets/images/people.png"),
  "promise.png":require("../assets/images/promise.png"),
  "love.png":require("../assets/images/love.png"),
  "heaven.png":require("../assets/images/heaven.png"),
  "eternal.png":require("../assets/images/eternal.png"),
  "story.png":require("../assets/images/story.png"),
  "timeline.png":require("../assets/images/timeline.png"),
  "themes.png":require("../assets/images/themes.png"),
  "moses.png":require("../assets/images/moses.png"),
  "altar.png":require("../assets/images/altar.png"),
  "priest.png":require("../assets/images/priest.png"),
  "abraham.png":require("../assets/images/abraham.png"),
  "patriarchs.png":require("../assets/images/patriarchs.png"),
  "harp.png":require("../assets/images/harp.png"),
  "coat.png":require("../assets/images/coat.png"),
  "broken-crown.png":require("../assets/images/broken-crown.png"),
  "hope.png":require("../assets/images/hope.png"),
  "dream.png":require("../assets/images/dream.png"),
  "lamp.png":require("../assets/images/lamp.png"),
  "wheat.png":require("../assets/images/wheat.png"),
  "crown.png":require("../assets/images/crown.png"),
  "scroll.png":require("../assets/images/scroll.png"),
  "messiah.png":require("../assets/images/cross.png"),
  "mega.png":require("../assets/images/mega.png"),
  "chat.png":require("../assets/images/chatbot.png"),
  "servent.png":require("../assets/images/servent.png"),
  "hands.png":require("../assets/images/hands.png"),
  "fire.png":require("../assets/images/fire.png"),
  "path.png":require("../assets/images/path.png"),
  "boots.png":require("../assets/images/boots.png"),
  "calendar-check.png":require("../assets/images/calendar-check.png"),
  "context.png":require("../assets/images/context.png"),
  "book-stack.png":require("../assets/images/book-stack.png"),
  "notebook.png":require("../assets/images/notebook.png"),
  "question.png":require("../assets/images/question.png"),
};

export default function BibleStructureSection({ blocks }: Props) {
  return (
    <View style={styles.wrapper}>
      {blocks.map((block, index) => (
        <View key={index} style={styles.block}>
          <Image source={iconMap[block.icon]} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{block.title}</Text>
            <Text style={styles.description}>{block.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
    gap: 12,
  },
  block: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  icon: {
    width: 66,
    height: 66,
    marginTop: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3E4E40',
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 20,
  },
});
