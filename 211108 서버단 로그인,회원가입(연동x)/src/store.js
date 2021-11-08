const redux = require('redux');
const {createStore} = require('redux')
const reduxLogger = require('redux-logger'); //createStore시 두번째 인자로 미들웨어 넣기 위함
// console.log(redux)
// console.log(reactRedux)

const applyMiddleware = redux.applyMiddleware; //미들웨어 넣으려면 이거 필요
const logger = reduxLogger.createLogger 

//actions
const ADD_SUBSCRIBER ='ADD_SUBSCRIBER'
const addSubscriber =()=>{
    return {
        type: 'ADD_SUBSCRIBER'
    }
}
//reducers
const initialState = {
    subscribers: 365
}
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_SUBSCRIBER:
            return{
                ...state,
                subscribers: state.subscribers +1
            }
        default:
            return state;
    }
}
//store
const store = createStore(reducer,applyMiddleware(logger));
console.log(store);
console.log(store.getState())

//subscribe - view - dispatch

store.dispatch(addSubscriber())
console.log(store.getState())