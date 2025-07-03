import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/App.css';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  register: {
    id: string;
    username: string;
    email: string;
  };
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const [registerUser, { loading, error }] = useMutation<RegisterResponse>(REGISTER_USER, {
    onCompleted: (data) => {
      console.log('Registration successful:', data);
      navigate('/'); // Redirect to login or contacts
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser({
      variables: {
        username: form.username,
        email: form.email,
        password: form.password
      }
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
