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
import Header from './Header';
import Footer from './Footer';

const Home = () => {

    return (
        <div>
            
            <Header/>
            <div className="banner-container">
                <div className="text-center">
                    <h1 className="h1">Welcome to IssueTrackingTool</h1>
                    <br/><br/><br/>
                    <h4 className="h4">Go Ahead and Analyse Issues!</h4>
                    <br/><br/><br/>
                    <center>
                        <a href="/projects">
                    <button  className='home-page-btn'>
                        Explore Projects
                    </button></a></center>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;