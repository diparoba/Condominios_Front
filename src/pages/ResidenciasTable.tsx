import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';

const ResidenciasTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5279/api/Property')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <ContentHeader title="Residencias" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Residencias</h3>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Unit Number</th>
                    <th>Size</th>
                    <th>Amenities</th>
                    <th>Owner ID</th>
                    <th>Owner Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.unitNumber}</td>
                      <td>{item.size}</td>
                      <td>{item.amenities.join(', ')}</td>
                      <td>{item.ownerId}</td>
                      <td>{item.ownerName}</td>
                      <td>{item.status}</td>
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

export default ResidenciasTable;
