import React from 'react';
import '../styles/FeedbackList.css'; 

const FeedbackList = ({ feedback }) => {
  return (
    <div className="feedback-list">
      {feedback.map(item => (
        <div key={item.id} className="feedback-card">
          <h3 className="feedback-title">{item.title}</h3>
          <p className="feedback-description">{item.detail}</p>
          <span className="feedback-tag">{item.category}</span>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;