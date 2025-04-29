import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import Home from './pages/Home';
import Personality from './pages/Personality';
import Appearance from './pages/Appearance';
import Fitness from './pages/Fitness';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatedBackground />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personality" element={<Personality />} />
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;