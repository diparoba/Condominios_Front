import React, { useState, useEffect } from 'react';
import { ContentHeader } from '@components';

const ResidenciasForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [size, setSize] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [ownerId, setOwnerId] = useState('');
  const [status, setStatus] = useState('');
  const [owners, setOwners] = useState([]);
  const [message, setMessage] = useState('');

  const amenityOptions = ['Sillones', 'Cocina a gas', 'Cocina Eléctrica', 'Cama', 'Television'];

  useEffect(() => {
    fetch('http://localhost:5279/api/Propietor')
      .then(response => response.json())
      .then(data => setOwners(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      address,
      unitNumber,
      size,
      amenities,
      ownerId,
      status
    };

    fetch('http://localhost:5279/api/Propiety', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setMessage('Residencia Creada Correctamente');
        setName('');
        setAddress('');
        setUnitNumber('');
        setSize('');
        setAmenities([]);
        setOwnerId('');
        setStatus('');
      } else {
        setMessage('Residencia no creada');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage('Residencia no creada');
    });
  };

  const handleAmenityChange = (event) => {
    if (event.target.checked) {
      setAmenities(oldAmenities => [...oldAmenities, event.target.value]);
    } else {
      setAmenities(oldAmenities => oldAmenities.filter(amenity => amenity !== event.target.value));
    }
  };

  return (
    <div>
      <ContentHeader title="Crear Residencia" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre:
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                  Dirección:
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
                </label>
                <label>
                  Número de Unidad:
                  <input type="text" value={unitNumber} onChange={e => setUnitNumber(e.target.value)} required />
                </label>
                <label>
                  Tamaño:
                  <input type="text" value={size} onChange={e => setSize(e.target.value)} required />
                </label>
                <label>
                  Propietario:
                  <select value={ownerId} onChange={e => setOwnerId(e.target.value)} required>
                    <option value="">--Seleccione un propietario--</option>
                    {owners.map((owner) => (
                      <option key={owner.id.timestamp} value={owner.id}>{owner.name} {owner.lastname}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Estado:
                  <select value={status} onChange={e => setStatus(e.target.value)} required>
                    <option value="">--Seleccione un estado--</option>
                    <option value="A">Activo</option>
                    <option value="I">Inactivo</option>
                  </select>
                </label>
                <fieldset>
                  <legend>Amenidades:</legend>
                  {amenityOptions.map((amenity, index) => (
                    <label key={index}>
                      <input type="checkbox" value={amenity} checked={amenities.includes(amenity)} onChange={handleAmenityChange} /> {amenity}
                    </label>
                  ))}
                </fieldset>
                <input type="submit" value="Crear Residencia" />
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidenciasForm;
