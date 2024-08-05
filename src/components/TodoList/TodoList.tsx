import { push, ref, set } from 'firebase/database';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import './TodoList.css';
import { auth, database } from '../../services/firebasedb';

const TodoList = () => {
  const [user] = useAuthState(auth);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleAdd = () => {
    if (user) {
      const todoRef = ref(database, `/users/${user.uid}/todos`);
      const newTodoRef = push(todoRef);
      set(newTodoRef, {
        title: newTodo,
        description: newDescription,
        done: false,
        startDate,
        endDate,
      })
        .then(() => {
          setNewTodo('');
          setNewDescription('');
          setStartDate('');
          setEndDate('');
        })
        .catch((error) => {
          console.error('Error adding new todo: ', error);
        });
    }
  };

  return (
    <div>
      <h1>Создать новую задачу</h1>
      <div className='center-container'>
        <form
          className='input-container'
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Название задачи'
            aria-label='Название задачи'
            required
          />
          <input
            type='text'
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder='Описание задачи'
            aria-label='Описание задачи'
            required
          />
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder='Start Date'
            aria-label='Start Date'
            required
          />
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder='End Date'
            aria-label='End Date'
            required
          />
          <button type='submit'>Добавить</button>
        </form>
        <Link to='/manage-tasks'>
          <button>Управлять задачами</button>
        </Link>
      </div>
    </div>
  );
};

export default TodoList;
