export const initialState = {};

export function habitReducer(state, action) {
  switch (action.type) {
    case "ADD HABIT":
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;


    case "DONE TODAY": {
      const { id } = action.payload
      const today = new Date().toISOString().split("T")[0]
      if (state[id].completedDates.includes(today)) {
        return state
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          completedDates: [
            ...state[id].completedDates,
            today
          ]
        }
      }
    }

    case "ARCHIVE HABIT": {
      const { id } = action.payload

      return {
        ...state,
        [id]: {
          ...state[id],
          status: "archived"
        }
      }
    }

    case "UPDATE WEEKLY TARGET":
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          weeklyTarget: action.payload.weeklyTarget
        }
      }
    // return {
    //   ...state,
    //   habits: Object.values(state).map(habit =>
    //     habit.id === action.payload.id
    //       ? { ...habit, weeklyTarget: action.payload.weeklyTarget }
    //       : habit
    //   )
    // }
  }
}
