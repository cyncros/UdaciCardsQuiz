export const FETCH_DECKS = "FETCH_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_DECK="REMOVE_DECK"

export function fetchDecks(decks) {
  return {
    type: FETCH_DECKS,
    decks
  };
}

export  function delDeck(title) {
  return{
    type:REMOVE_DECK,
    title
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}
export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  };
}
