export const initialState = {
  habits: [],
};

export function habitReducer(state, action) {
  switch(action.type) {
    case "ADD HABIT":
      return {
        ...state, 
        habits: [...state.habits, action.payload],
      };
      default:
        return state;
  }
}