import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { auth, database } from '../services/firebasedb';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await set(ref(database, `/users/${user.uid}`), {
        email,
        nickname,
        todos: [],
      });
      setSuccess('Registration successful!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Регистрация</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль'
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Ник'
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button
          type='submit'
          style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
