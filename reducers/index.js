import { FETCH_DECKS, ADD_DECK, ADD_CARD } from "../actions";
const initialState = {
  deck: {}
};

function deck(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        deck: action.decks
      };
    case ADD_DECK:
      return {
        ...state.deck,
        [action.title]: {
          title: action.title,
          questions: []
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
            questions: [...state.deck[id].questions, card]
          }
        }
      };
    default:
      return state;
  }
}
export default deck;
