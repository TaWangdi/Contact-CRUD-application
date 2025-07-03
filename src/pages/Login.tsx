import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/App.css';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.token;
      localStorage.setItem('token', token);
      const decodedUser = jwtDecode<any>(token);
      setUser(decodedUser);
      navigate('/contacts');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ variables: { email: form.email, password: form.password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" disabled={loading}>Login</button>
      {error && <p style={{ color: 'red' }}>Login failed: {error.message}</p>}
      <p><Link to="/register">Register</Link></p>
    </form>
  );
};

export default Login;
