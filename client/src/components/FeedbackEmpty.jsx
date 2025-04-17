import '../styles/FeedbackEmpty.css';

import { useNavigate } from 'react-router-dom';

const FeedbackEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="feedback-empty-page">
      <div className="empty-state">
        <img src="/img/empty.png" alt="No feedback illustration" className="feedback-img" />
        <h2>There is no feedback yet.</h2>
        <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <button className="add-feedback" onClick={() => navigate('/add-feedback')}>+ Add Feedback</button>
      </div>
    </div>
  );
};
export default FeedbackEmpty;