import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';

const ResidentesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5279/api/Propietor')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ContentHeader title="Residentes" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Residentes</h3>
            </div>
            <div className="card-body">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Identificacion</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.identificacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentesTable;