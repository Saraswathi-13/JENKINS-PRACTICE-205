import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const Manager = () => {
  const [managers, setManagers] = useState([]);
  const [manager, setManager] = useState({
    id: '',
    name: '',
    gender: '',
    program: '',
    experience: '',
    salary: '',
    email: '',
    password: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedManager, setFetchedManager] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/managerapi`;

  useEffect(() => {
    fetchAllManagers();
  }, []);

  const fetchAllManagers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setManagers(res.data);
    } catch (error) {
      setMessage('Failed to fetch managers.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Keep ID as int only when entered, else blank
    if (name === "id") {
      setManager({ ...manager, id: value === "" ? "" : parseInt(value, 10) });
    } else {
      setManager({ ...manager, [name]: value });
    }
  };

  const validateForm = () => {
    for (let key in manager) {
      if (manager[key] === '' || manager[key] === null) {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addManager = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, manager);
      setMessage('Manager added successfully.');
      fetchAllManagers();
      resetForm();
    } catch (error) {
      setMessage('Error adding manager.');
    }
  };

  const updateManager = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, manager);
      setMessage('Manager updated successfully.');
      fetchAllManagers();
      resetForm();
    } catch (error) {
      setMessage('Error updating manager.');
    }
  };

  const deleteManager = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllManagers();
    } catch (error) {
      setMessage('Error deleting manager.');
    }
  };

  const getManagerById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedManager(res.data);
      setMessage('');
    } catch (error) {
      setFetchedManager(null);
      setMessage('Manager not found.');
    }
  };

  const handleEdit = (stud) => {
    setManager(stud);
    setEditMode(true);
    setMessage(`Editing manager with ID ${stud.id}`);
  };

  const resetForm = () => {
    setManager({
      id: '',
      name: '',
      gender: '',
      program: '',
      experience: '',
      salary: '',
      email: '',
      password: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="manager-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {/* Add / Edit Manager */}
      <div>
        <h3>{editMode ? 'Edit Manager' : 'Add Manager'}</h3>
        <div className="form-grid">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={manager.id === '' ? '' : manager.id}
            onChange={handleChange}
          />
          <input type="text" name="name" placeholder="Name" value={manager.name} onChange={handleChange} />
          <select name="gender" value={manager.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <select name="program" value={manager.program} onChange={handleChange}>
            <option value="">Select Program</option>
            <option value="Technical">Technical</option>
            <option value="Non Technical">Non Technical</option>
          </select>
          <select name="experience" value={manager.experience} onChange={handleChange}>
            <option value="">Select Experience</option>
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
          </select>
          <select name="salary" value={manager.salary} onChange={handleChange}>
            <option value="">Select Salary</option>
            <option value="ABOVE 10 LAKHS">ABOVE 10 LAKHS</option>
            <option value="ABOVE 20 LAKHS">ABOVE 20 LAKHS</option>
          </select>
          <input type="email" name="email" placeholder="Email" value={manager.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={manager.password} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={manager.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addManager}>Add Manager</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateManager}>Update Manager</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get Manager By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getManagerById}>Fetch</button>

        {fetchedManager && (
          <div>
            <h4>Manager Found:</h4>
            <pre>{JSON.stringify(fetchedManager, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Managers Table */}
      <div>
        <h3>All Managers</h3>
        {managers.length === 0 ? (
          <p>No managers found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(manager).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((stud) => (
                  <tr key={stud.id}>
                    {Object.keys(manager).map((key) => (
                      <td key={key}>{stud[key] === '' ? '' : stud[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(stud)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteManager(stud.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Manager;
