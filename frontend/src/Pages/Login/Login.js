import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

/*not used*/

async function loginUser(credentials) {
  axios.post(`http://localhost:8000/api/usuarios/login`, { credentials })
    .then(res => {
      if(res.data.id){
        alert('Successful Login')
        localStorage.setItem('usuario_id', res.data.id);
        localStorage.setItem('email', res.data.email);
      } else {
        alert('Incorrect Email or Password')
      }
    })
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    loginUser({
      email,
      password
    });
  }

  return(
    <div className="login-wrapper">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <hr/>
        <div>
          <button type="submit" className="button">Submit</button>
        </div>
      </form>
    </div>
  )
}