import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
/*not used*/
async function RegisterUser(credentials) {
  axios.post(`http://localhost:8000/api/usuarios/create`, { credentials })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    RegisterUser({
      email,
      password
    });
  }

  return(
    <div className="register-wrapper">
      <h1>Sign Up</h1>
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