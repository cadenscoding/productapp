import React, { useState } from 'react';
import '../styles/AddFeedbackForm.css';
import { useNavigate } from 'react-router-dom';

const AddFeedbackForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Feature');
  const [detail, setDetail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { title, category, detail };

    try {
      const res = await fetch('https://productapp-9q9e.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });

      const data = await res.json();
      if (data.success) {
        navigate('/');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong submitting feedback.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <button className="go-back" onClick={() => navigate(-1)}>← Go Back</button>
        <div className="form-header">
          <div className="form-icon">+</div>
          <h2>Create New Feedback</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Feedback Title</label>
          <p className="form-description">Add a short, descriptive headline</p>
          <input
            className="form-input"
            type="text"
            placeholder="Feedback title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="form-label">Category</label>
          <p className="form-description">Choose a category for your feedback</p>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Feature</option>
            <option>UI</option>
            <option>UX</option>
            <option>Bug</option>
            <option>Enhancement</option>
          </select>

          <label className="form-label">Feedback Detail</label>
          <p className="form-description">Include any specific comments on what should be improved, added, etc.</p>
          <textarea
            className="form-input"
            rows="5"
            placeholder="Detailed feedback"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          <button className="submit-btn" type="submit">Add Feedback</button>
          <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedbackForm;