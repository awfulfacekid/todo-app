import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Todo, auth, database } from '../services/firebasedb';

const Home: React.FC = () => {
  const [greetMsg, setGreetMsg] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [user] = useAuthState(auth);
  const [activeTasks, setActiveTasks] = useState<Todo[]>([]);
  const [nickname, setNickname] = useState<string>('');
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `/users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tasks: Todo[] = data.todos ? Object.values(data.todos) : [];
          setActiveTasks(tasks.filter((task: Todo) => !task.done));
          setNickname(data.nickname || '');
        }
      });
    }
  }, [user]);

  const toggleDetails = (id: string) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <h1>Добро пожаловать в TodoApp!</h1>
      <div>
        <h2>Здравствуйте, {nickname}</h2>
        <h2>Активные задачи</h2>
        {activeTasks.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <button onClick={() => toggleDetails(task.id)}>Подробнее</button>
            {showDetails[task.id] && (
              <div>
                <p>Начать выполнять: {task.startDate}</p>
                <p>Завершить: {task.endDate}</p>
                {task.description && <p>Описание: {task.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
