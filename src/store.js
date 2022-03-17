import { createStore } from 'redux'
const randomWords = require('random-words');

const ADD_HERO = "ADD_HERO"

let nextId = 0;
export const addHero = ( ) => ({
    type: ADD_HERO,
    id: nextId++,
    name: 'Marth_Clone',
    weapon: 'Sword',
    gameId: 1
});

function reducer(currentState, action) {
    switch(action.type) {
        case ADD_HERO:
            const newHero = {

            }
            return {...currentState, newHero};
        default: 
            return currentState;
    }
}

const store = createStore(reducer)

export default store