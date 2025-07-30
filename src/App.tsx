import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddAgent from './pages/AddAgent';
import AgentDetails from './pages/AgentDetails';
import AgentChat from './pages/AgentChat';
import Header from './components/ui/Header';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/agents/:id" element={<AgentDetails />} />
          <Route path="/agents/:id/chat" element={<AgentChat />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
