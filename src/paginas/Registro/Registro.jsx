import React, { useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/userApi.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      const result = await createUser(userData);
      console.log(result);
      navigate('/'); // Aquí puedes manejar lo que sucede después de crear el usuario, ej: navegacion
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="register-father">
      <Header />
      <div className="register-body">
        <div className="register-container">
          <h1 className="register-title">Registro</h1>
          <form className='form-group' onSubmit={handleSubmit}>
            <input className='register-input-text' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className='register-input-text' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className='register-input-text' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className='button-register' type="submit">Register</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
