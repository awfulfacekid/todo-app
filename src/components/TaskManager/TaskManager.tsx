import { onValue, ref, remove, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './TaskManager.css';
import { Todo, auth, database } from '../../services/firebasedb';

const TaskManager = () => {
  const [user] = useAuthState(auth);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (user) {
      const todoRef = ref(database, `/users/${user.uid}/todos`);
      onValue(todoRef, (snapshot) => {
        const todos = snapshot.val();
        const newTodoList: Todo[] = [];
        for (let id in todos) {
          newTodoList.push({ id, ...todos[id] });
        }
        setTodoList(newTodoList);
      });
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (user) {
      const todoRef = ref(database, `/users/${user.uid}/todos/${id}`);
      remove(todoRef)
        .then(() => {
          console.log(`Todo with id ${id} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting todo with id ${id}: `, error);
        });
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditTask(todo);
    setNewTodo(todo.title);
    setNewDescription(todo.description);
    setStartDate(todo.startDate);
    setEndDate(todo.endDate);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && editTask) {
      const todoRef = ref(database, `/users/${user.uid}/todos/${editTask.id}`);
      update(todoRef, {
        title: newTodo,
        description: newDescription,
        startDate,
        endDate,
      })
        .then(() => {
          setEditTask(null);
          setNewTodo('');
          setNewDescription('');
          setStartDate('');
          setEndDate('');
        })
        .catch((error) => {
          console.error('Error updating todo: ', error);
        });
    }
  };

  const toggleDetails = (id: string) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className='task-manager-container'>
      <h1>Управление задачами</h1>
      <div className='task-manager'>
        {todoList.map((todo) => (
          <div key={todo.id} className='task-item'>
            <p>{todo.title}</p>
            <button onClick={() => toggleDetails(todo.id)}>Подробнее</button>
            {showDetails === todo.id && (
              <div className='task-details'>
                <p>{todo.description}</p>
                <p>Начать выполнять: {todo.startDate}</p>
                <p>Завершить: {todo.endDate}</p>
                <button onClick={() => handleEdit(todo)}>Редактировать</button>
                <button onClick={() => handleDelete(todo.id)}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {editTask && (
        <form className='input-container' onSubmit={handleUpdate}>
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
          <button type='submit'>Сохранить</button>
        </form>
      )}
    </div>
  );
};

export default TaskManager;
