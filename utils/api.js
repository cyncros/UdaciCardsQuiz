import { AsyncStorage } from "react-native";
const UDCARDS_KEY = "udacicards:deck";

export function getDecks() {
  return AsyncStorage.getItem(UDCARDS_KEY, (error, result) => {
    if (result === null) {
      return { deck: {} };
    }
    return JSON.parse(result);
  });
}

export function saveDeckTitle(deckTitle) {
  return AsyncStorage.mergeItem(
    UDCARDS_KEY,
    JSON.stringify({
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(UDCARDS_KEY).then(result => {
    const data = JSON.parse(result);
    data[title].questions = data[title].questions.concat(card);
    console.log(data[title], "titles");
    console.log(data[title].questions, "QUEST");
    AsyncStorage.setItem(UDCARDS_KEY, JSON.stringify(data));
  });
}
