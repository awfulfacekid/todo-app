import { useAuthState } from 'react-firebase-hooks/auth';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './styles/App.css';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskManager from './components/TaskManager/TaskManager';
import TodoList from './components/TodoList/TodoList';
import './services/firebasedb';
import { auth } from './services/firebasedb';
import { useState } from 'react';

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className='container'>
        <div className='App'>
          {user ? (
            <>
              <button
                className={`menu-button ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label='Toggle menu'
              >
                Menu
              </button>
              <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                  <li>
                    <Link to='/home'>Главная</Link>
                  </li>
                  <li>
                    <Link to='/todolist'>Мои задачи</Link>
                  </li>
                </ul>
              </nav>
              <div className='content'>
                <Routes>
                  <Route path='/home' element={<Home />} />
                  <Route path='/todolist' element={<TodoList />} />
                  <Route path='/manage-tasks' element={<TaskManager />} />
                  <Route path='/about' element={<About />} />
                  <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
              </div>
            </>
          ) : (
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
