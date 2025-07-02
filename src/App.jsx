import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/main.scss';

// Import Context Provider
import { AppProvider } from './context/AppContext';

// Import components and pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Component3 from './components/Component3';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Echarts from './pages/Echarts';
import Maps from './pages/Maps';
import Mobility from './pages/Mobility';
import Overview from './pages/Overview';

import DeckGLPage from './pages/DeckGL';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App min-vh-100 d-flex flex-column">
          <Navbar />
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task1" element={<Component1 />} />
              <Route path="/task2" element={<Component2 />} />
              <Route path="/products" element={<Component3 />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/charts" element={<Echarts />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/mobility" element={<Mobility />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/deckgl" element={<DeckGLPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;


