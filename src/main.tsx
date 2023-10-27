import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LocomotiveScroll from "locomotive-scroll";
const locomotiveScroll: any = new LocomotiveScroll();
console.log("Locomotive", locomotiveScroll);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
