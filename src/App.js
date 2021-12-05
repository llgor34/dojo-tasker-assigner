import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/navbar/Sidebar';
import OnlineUsers from './components/onlineUsers/OnlineUsers';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {!user && <Navigate to="/login" />}
                    {user && <Dashboard />}
                  </>
                }
              />
              <Route
                path="/create"
                element={
                  <>
                    {!user && <Navigate to="/login" />}
                    {user && <Create />}
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    {!user && <Navigate to="/login" />}
                    {user && <Project />}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user && <Navigate to="/" />}
                    {!user && <Login />}
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    {user && <Navigate to="/" />}
                    {!user && <Signup />}
                  </>
                }
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
}

export default App;
