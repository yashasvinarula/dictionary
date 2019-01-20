const initialState = [];
export default function(state = initialState, action){
  switch(action.type){
    case 'PUSH_WORD': {
        return {
          words: action.payload
        }
      }
    default:
      return []
  }
}
