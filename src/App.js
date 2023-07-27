import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)

    return (
     
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Routes>
            <Route path="/" element={<News setprogress = {setProgress} apiKey = {apiKey} key="general" pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News setprogress = {setProgress} apiKey = {apiKey} key="business" pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setprogress = {setProgress} apiKey = {apiKey} key="entertainment" pageSize={6} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setprogress = {setProgress} apiKey = {apiKey} key="general" pageSize={6} country="in" category="general" />} />
            <Route path="/health" element={<News setprogress = {setProgress} apiKey = {apiKey} key="health" pageSize={6} country="in" category="health" />} />
            <Route path="/science" element={<News setprogress = {setProgress} apiKey = {apiKey} key="science" pageSize={6} country="in" category="science" />} />
            <Route path="/sports" element={<News setprogress = {setProgress} apiKey = {apiKey} key="sports" pageSize={6} country="in" category="sports" />} />
            <Route path="/technology" element={<News setprogress = {setProgress} apiKey = {apiKey} key="technology" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  
}

export default App;
