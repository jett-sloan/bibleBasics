import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import BibleStructureSection from "../components/BibleStructureSection";
import whatisbible from "../assets/studybasics/whatisbible.json";
import thebigstory from "../assets/studybasics/thebigstory.json"
import InterestSelector from "../components/InterestSelector";
import QuizQuestion from "../components/QuizQuestion";
import ThinkAboutThis from "../components/ThinkAboutThis";
import otian from "../assets/studybasics/otian.json"
import ntian from "../assets/studybasics/ntian.json"
import howtoread from "../assets/studybasics/howtoread.json"


// TYPES
type EnhancedBlock = {
  title: string;
  icon: string;
  description: string;
};
type ScriptureReference = {
  reference: string;
  text: string;
};
type Section =

  | {
    responses: Record<string, string> | undefined;
    label: string;
    type: "interactive";
    options: string[];
  }
  | {
    label: string;
    type: "quiz";
    question: string;
    options: string[];
    answer: string;
  }
  | {
    label: string;
    text?: string;
    enhanced?: EnhancedBlock[];
  }
  | {
    label: string
    type: "reflection"
    question: string
    scripture: ScriptureReference
    prompt: string
    inputPlaceholder: string
  };


const biblePlans: Record<
  string,
  {
    lessonName: string;
    subUnits: {
      title: string;
      sections?: Section[];
    }[];
  }
> = {
  "what is the bible": whatisbible,
  "big story": thebigstory,
  "old testament": otian,
  "new testament": ntian,
  "how to read the bible": howtoread
};

// Helpers
function isInteractiveSection(
  section: Section
): section is { label: string; type: string; options: string[] } {
  return (
    "type" in section && section.type === "interactive" && "options" in section
  );
}

function hasEnhancedContent(
  section: Section
): section is { label: string; text: string; enhanced: EnhancedBlock[] } {
  return "enhanced" in section && Array.isArray(section.enhanced);
}

function isReflectionSection(
  section: Section
): section is {
  label: string;
  type: "reflection";
  question: string;
  scripture: ScriptureReference;
  prompt: string;
  inputPlaceholder: string;
} {
  return "type" in section && section.type === "reflection";
}

function isQuizSection(
  section: Section
): section is {
  label: string;
  type: "quiz";
  question: string;
  options: string[];
  answer: string;
} {
  return "type" in section && section.type === "quiz";
}
function hasText(section: Section): section is { label: string; text: string } {
  return "text" in section;
}




export default function BiblePlan() {
  const { book } = useLocalSearchParams();
  const decodedBook = decodeURIComponent(book as string).toLowerCase();
  const content = biblePlans[decodedBook];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  if (!content) {
    return <Text style={styles.error}>No content found for this topic.</Text>;
  }

  const currentUnit = content.subUnits[currentIndex];

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setExpandedSections({});
  };

  const goToBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setExpandedSections({});
    }
  };


  return (
    <ImageBackground
      source={require("../assets/images/bgbb.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.progress}>
          Step {currentIndex + 1} of {content.subUnits.length}
        </Text>

        <View style={styles.card}>
          <Text style={styles.title}>{currentUnit.title}</Text>

          {currentUnit.sections?.map((section, index) => {

            if (isQuizSection(section)) {
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleSection(index)}
                  style={styles.sectionCard}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.toggleIndicator}>
                      {expandedSections[index] ? "▲" : "▼"}
                    </Text>
                  </View>

                  {expandedSections[index] && (
                    <QuizQuestion
                      question={section.question}
                      options={section.options}
                      answer={section.answer}
                    />
                  )}
                </Pressable>
              );
            }
            if (isReflectionSection(section)) {
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleSection(index)}
                  style={styles.sectionCard}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.toggleIndicator}>
                      {expandedSections[index] ? "▲" : "▼"}
                    </Text>
                  </View>
                  {expandedSections[index] && (
                   
                      <ThinkAboutThis
                        question={section.question}
                        scripture={section.scripture}
                        prompt={section.prompt}
                        inputPlaceholder={section.inputPlaceholder}
                      />
                      
                   
                  )}

                </Pressable>
              );
            }
            if (isInteractiveSection(section)) {
              return (
                <InterestSelector
                  key={index}
                  label={section.label}
                  options={section.options}
                  responses={section.responses}
                />
                

              );
            }

            if (hasEnhancedContent(section)) {
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleSection(index)}
                  style={styles.sectionCard}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.sectionLabel}>{section.label}</Text>
                    <Text style={styles.toggleIndicator}>
                      {expandedSections[index] ? "▲" : "▼"}
                    </Text>
                  </View>

                  {expandedSections[index] && (
                    <>
                      {!!section.text && (
                        <Text style={styles.sectionText}>{section.text}</Text>
                      )}
                      <BibleStructureSection blocks={section.enhanced} />

                    </>
                  )}
                </Pressable>
              );
            }

            return (
              <Pressable
                key={index}
                onPress={() => toggleSection(index)}
                style={styles.sectionCard}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.sectionLabel}>{section.label}</Text>
                  <Text style={styles.toggleIndicator}>
                    {expandedSections[index] ? "▲" : "▼"}
                  </Text>
                </View>
                {expandedSections[index] && hasText(section) && (
                  <Text style={styles.sectionText}>{section.text}</Text>
                )}

              </Pressable>
            );
          })}

          <View style={styles.buttonRow}>
            {currentIndex > 0 && (
              <Pressable style={styles.backButton} onPress={goToBack}>
                <Text style={styles.backText}>← Back</Text>
              </Pressable>
            )}

            {currentIndex < content.subUnits.length - 1 ? (
              <Pressable style={styles.nextButton} onPress={goToNext}>
                <Text style={styles.nextText}>Next →</Text>
              </Pressable>
            ) : (
              <Text style={styles.finished}>🎉 You've completed this lesson!</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: "center",
  },
  progress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F3EAC2",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    borderColor: "darkgreen",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: "PlayfairDisplay-Regular",
    color: "#3E4E40",
    marginBottom: 15,
  },
  sectionCard: {
    backgroundColor: "#EFE9D3",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3E4E40",
  },
  toggleIndicator: {
    fontSize: 16,
    color: "#3E4E40",
    fontWeight: "bold",
  },
  sectionText: {
    fontSize: 20,
    color: "#444",
    marginTop: 8,
    paddingLeft: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#A4C3B2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
  },
  finished: {
    fontSize: 16,
    color: "#3E4E40",
    fontStyle: "italic",
    alignSelf: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
