import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, {useState} from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');  // mode for dark/light toggle
  const [alert, setAlert] = useState(null);   // alert message storage

  // function for showing alert
  const showAlert = (message, type) =>{
      setAlert({
        msg: message,
        type: type
      });

      // auto dismiss alert
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }

  // dark mode toggle function
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
      document.title = 'TextUtils - Dark Mode';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
      document.title = 'TextUtils - Light Mode';
    }
  }

  return (
    <>
      {/* ------- ❌ OLD CODE COMMENTED AS YOU SAID --------      
      <Navbar title="TextUtils" aboutText="About us"  mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} />
      <div className="container my-3">
       <TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode}/>
        <About />
      </div>
      ------------------------------------------------- */}

      {/* ⭐ Updated router-enabled working code */}
      <Router>

        {/* Navbar always stays visible */}
        <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode}/>

        {/* Alert component display */}
        <Alert alert={alert} />

        {/* Pages render area */}
        <div className="container my-3">

          <Routes>

            {/* Home route */}
            <Route 
              path="/" 
              element={<TextForm heading="Enter text to analyze" mode={mode} showAlert={showAlert} />}
            />

            {/* About route */}
            <Route 
              path="/about" 
              element={<About />} 
            />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
