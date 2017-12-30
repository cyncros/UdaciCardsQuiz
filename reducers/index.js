import { FETCH_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from "../actions";
import omit from "lodash.omit";

const initialState = {
  deck: {}
};

function deck(state = initialState, action) {
  switch (action.type) {
    case REMOVE_DECK:
      let delDeck = omit(state.deck, action.data);
      return {
        ...state,
        deck: delDeck
      };
    case FETCH_DECKS:
      return {
        ...state,
        deck: action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        deck: {
          ...state.deck,
          [action.title]: {
            title: action.title,
            questions: []
          }
        }
      };
    case ADD_CARD:
      const { id, card } = action;
      return {
        ...state,
        deck: {
          ...state.deck,
          [id]: {
            ...state.deck[id],
            questions: [...state.deck[id].questions, { card: card }]
          }
        }
      };
    default:
      return state;
  }
}
export default deck;
