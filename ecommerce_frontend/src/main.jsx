import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './redux-toolkit/Store.jsx'
import { ToastContainer } from 'react-toastify'
import Context from './Context/Context.jsx'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer theme={'light'} autoClose={1500}></ToastContainer>
    <Provider store={Store}>
    <Context>
    
    <App />
   
    </Context>
    </Provider>
  </React.StrictMode>,
)
