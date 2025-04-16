import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FeedbackEmpty from './components/FeedbackEmpty';
import AddFeedbackForm from './components/AddFeedbackForm'; // <- import the form
import './styles/Layout.css';

function App() {
  return (
    <Router>
      <Layout />
      <main>
        <Routes>
          <Route path="/" element={<FeedbackEmpty />} />
          <Route path="/add-feedback" element={<AddFeedbackForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;