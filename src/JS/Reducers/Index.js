import { ADD_ARTICLE } from "JS/Constants/Action-types";

const initialState = {
    articles: []
  };

function rootReducer(state = initialState, action) {
    
    if(action.type === ADD_ARTICLE){
        return {...state, ...state.articles.push(action.payload)}
    }

    return state;
};

export default rootReducer;