// import React from 'react';
// import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import Footer from './Footer';


const Home = () => {

    return (
        <div>
            <div className="banner-container">
                <div className="text-center">
                    <h1 className="h1">Welcome to IssueTrackingTool</h1>
                    <br/><br/><br/>
                    <h4 className="h4">Go Ahead and Analyse Issues!</h4>
                    <br/><br/><br/>
                    {/* <center>
                        <a href="/projects">
                    <button className='button-background-color'>
                        Explore Projects
                    </button></a>
                    </center> */}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;