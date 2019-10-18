import { ADD_ARTICLE } from "JS/Constants/Action-types";


export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};