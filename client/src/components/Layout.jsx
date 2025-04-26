import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu.jsx';
import FilterTags from './FilterTags';
import '../styles/Layout.css';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('All');
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleAddFeedbackClick = () => navigate('/add-feedback');

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="logo-box">
          <h1>My Company</h1>
          <p>Feedback Board</p>
        </div>

        <div className="filter-box">
          <FilterTags selected={selectedTag} onSelect={setSelectedTag} />
        </div>
      </aside>

      <main className="main-content">
        <header className="header-container">
          <div className="header-top">
            <div className="branding">
              <h1 className="branding-mobile">My Company</h1>
              <p className="branding-mobile">Feedback Board</p>
            </div>
            <button className="menu-btn" onClick={toggleMenu}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div className="header-bottom">
            <h1 className="branding-desktop">Suggestions</h1>
            <button className="add-feedback" onClick={handleAddFeedbackClick}>
              + Add Feedback
            </button>
          </div>
        </header>

        <HamburgerMenu
          isOpen={menuOpen}
          onClose={toggleMenu}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        <div className="feedback-component">
          <Outlet context={{ selectedTag }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;