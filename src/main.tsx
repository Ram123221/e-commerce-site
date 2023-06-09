import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.tsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>

      {/*above is used to provide access to store database*/}
      <React.StrictMode>
        <App />
    </React.StrictMode>
    
  </Provider>,
)
