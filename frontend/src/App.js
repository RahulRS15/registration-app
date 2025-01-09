import React from 'react';
import RegistrationPage from './components/Registration/RegistrationPage';
import './styles.css';

const App = () => {
  return (
    <div>
      <div>
        <img src='/assets/login-form.png' alt='Login Form' />
      </div>
      <div className="App">
        <RegistrationPage />
      </div>
    </div>
  );
};

export default App;
