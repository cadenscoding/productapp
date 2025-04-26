import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FeedbackEmpty from './FeedbackEmpty';
import FeedbackList from './FeedbackList';
import '../styles/FeedbackPage.css';

const FeedbackPage = () => {
  const { selectedTag } = useOutletContext(); 
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('https://cadenproductapp.onrender.com/feedback');
      const data = await res.json();
      if (data.success) {
        setFeedbackList(data.data);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);


  const filteredFeedback =
    selectedTag === 'All'
      ? feedbackList
      : feedbackList.filter((item) => item.category === selectedTag);

  return (
    <div className="feedback-page">
      {loading ? (
        <p>Loading...</p>
      ) : filteredFeedback.length === 0 ? (
        <FeedbackEmpty />
      ) : (
        <FeedbackList feedback={filteredFeedback} />
      )}
    </div>
  );
};

export default FeedbackPage;
