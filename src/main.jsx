import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store';
import { PokedetailsProvider } from './context/Pokedetails';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PokedetailsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokedetailsProvider>
    </Provider>
  </StrictMode>
);
