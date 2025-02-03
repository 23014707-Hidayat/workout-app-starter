// App.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import WorkoutPage from './components/WorkoutPage';

const App = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <WorkoutPage />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <LoginPage onLogin={login} />
      )}
    </div>
  );
};

export default App;
