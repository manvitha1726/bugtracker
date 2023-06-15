import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <h1>Issue Controller Application</h1>
      </header>
      <main>
        <button>
          <Link to="/projects">Explore Projects</Link>
        </button>
      </main>
      <footer>
        <p>Relevant details here</p>
      </footer>
    </div>
  );
};

export default Home;
