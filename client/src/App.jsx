import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FeedbackPage from './components/FeedbackPage';
import AddFeedbackForm from './components/AddFeedbackForm';
import './styles/Layout.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedbackPage />} />
          <Route path="add-feedback" element={<AddFeedbackForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
