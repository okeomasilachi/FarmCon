
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Map from './components/Map'
import About from './components/About';

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
