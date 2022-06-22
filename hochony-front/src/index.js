import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';

let 초기값 = [];

function reducer(state = 초기값, 액션) {
  // reducer = state를 퉤 밷는 함수
  // 변수로 초기값 만들고 reducer 안에 넣기 그리고 state 수정하는 법도 작성
  if (액션.type === "항목추가") {
    let found = state.findIndex((a)=>{return a.id === 액션.payload.id})
    if (found >= 0){

      let copy = [...state];
      copy[found].quan++;
      return copy;

    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }
  } 
  
  else if (액션.type === "수량증가") {
    let copy = [...state];
    let found = state.findIndex((a)=>{return a.id === 액션.payload})
    copy[found].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    let found = state.findIndex((a)=>{return a.id === 액션.payload})
    if (copy[found].quan > 1) {
      copy[found].quan--;
      return copy;
    } else if (copy[found].quan <= 1) {
      delete(copy[found]);
      console.log(액션.payload);
      return copy;
    }
    
  } else {
    return state;
  }
}

let store = createStore(reducer);
 // store= state 보관통
// reducer 만든 걸 createStore()안에 넣으면 reducer가 완성
//reducer가 더 필요하면 combineReducers 쓰기
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
