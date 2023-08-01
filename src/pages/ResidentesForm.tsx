import React, { useState } from 'react';
import {ContentHeader} from '@components';

const ResidentesForm = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    identificacion: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5279/api/Propietor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setMessage('Usuario registrado correctamente');
      setForm({
        name: '',
        lastname: '',
        email: '',
        password: '',
        identificacion: ''
      });
    } else {
      setMessage('Usuario no registrado');
    }
  };

  return (
    <div>
      <ContentHeader title="Blank Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Title</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Form fields go here */}
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                <input type="text" name="identificacion" value={form.identificacion} onChange={handleChange} placeholder="Identificacion" />
                <button type="submit">Crear</button>
              </form>
              {message && <p>{message}</p>}
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentesForm;