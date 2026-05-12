export const initialState = {};

export function habitReducer(state, action) {
  switch (action.type) {
    case "ADD HABIT":
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          editCount: 0
        }
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

    case "UPDATE WEEKLY TARGET": {
      const { id, weeklyTarget } = action.payload

      return {
        ...state,
        [id]: {
          ...state[id],
          weeklyTarget,
          editCount: state[id].editCount + 1
        }
      }
    }

    case "SET BREAK": {
      const { id, days } = action.payload

      const today = new Date()
      const breakUntil = new Date()
      breakUntil.setDate(today.getDate() + days)

      const breakUntilStr = breakUntil.toISOString().split("T")[0]

      return {
        ...state,
        [id]: {
          ...state[id],
          breakUntil: breakUntilStr
        }
      }
    }
  }
}
