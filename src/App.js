import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'


class App extends Component {
  state={
    progress : 0
  }

  setProgress =(progress) => {
    this.setState({
      progress : progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route path="/" element={<News setprogress = {this.setProgress} key="general" pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News setprogress = {this.setProgress} key="business" pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setprogress = {this.setProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setprogress = {this.setProgress} key="general" pageSize={6} country="in" category="general" />} />
            <Route path="/health" element={<News setprogress = {this.setProgress} key="health" pageSize={6} country="in" category="health" />} />
            <Route path="/science" element={<News setprogress = {this.setProgress} key="science" pageSize={6} country="in" category="science" />} />
            <Route path="/sports" element={<News setprogress = {this.setProgress} key="sports" pageSize={6} country="in" category="sports" />} />
            <Route path="/technology" element={<News setprogress = {this.setProgress} key="technology" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
