// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <header>
//         <h1>Issue Controller Application</h1>
//       </header>
//       <main>
//         <button>
//           <Link to="/projects">Explore Projects</Link>
//         </button>
//       </main>
//       <footer>
//         <p>Relevant details here</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// src/components/Home/Home.js

// import CSS
import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {

    return (
        <div>
            <div className="banner-container">
                <div className="text-center">
                    <h1 className=" h1">Welcome to IssueTrackingTool</h1>
                    <h4 className="h4">Go Ahead and Analyse Issues!</h4>
                    <center>
                    <button>
                        <Link to="/projects">Explore Projects</Link>
                    </button></center>
                </div>
            </div>
        </div>
    );
};

export default Home;