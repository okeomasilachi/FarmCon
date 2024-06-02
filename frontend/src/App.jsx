
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/header/Header';
import Services from './components/services/Services';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Map from './components/map/Map'
import About from './components/about/About';

function App() {
  return (
    <div>
      <Header />
      <Services />
      <About />
      <Map />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
