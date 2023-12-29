// AddOrgTeam.js

import React, { useState } from 'react';
import './AddOrgTeam.css';

const AddOrgTeam = () => {
  const [organizingTeam, setOrganizingTeam] = useState([]);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    cost: '',
    rate: '',
    password: '', // Added password field
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newTeamMember.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!newTeamMember.cost.trim()) {
      newErrors.cost = 'Hiring cost is required';
    } else if (isNaN(newTeamMember.cost)) {
      newErrors.cost = 'Hiring cost must be a number';
    }

    if (!newTeamMember.rate.trim()) {
      newErrors.rate = 'Rate is required';
    } else if (isNaN(newTeamMember.rate)) {
      newErrors.rate = 'Rate must be a number';
    }

    if (!newTeamMember.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (newTeamMember.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleAddTeamMember = async () => {
    if (validateForm()) {
      console.log(newTeamMember)
      let respone = await fetch('http://localhost:8080/dashboard/add-organizer',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(newTeamMember)
      })
      if(respone.status!==201){
        alert('Request has been failed');
        return;
      }
      let result = await respone.json();
      console.log(result);

      setOrganizingTeam((prevTeam) => [...prevTeam, result.team])

      setNewTeamMember({
        name: '',
        cost: '',
        rate: '',
        password: '', // Reset password field
      });
    }
  };

  return (
      <div className="frame">
        <h1>Organizing Team Management</h1>
        <div  className="frame">
          <h2>Add New Team Member</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={newTeamMember.name} onChange={handleInputChange} />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </label>
            <label>
              Hiring Cost:
              <input
                  type="text"
                  name="cost"
                  value={newTeamMember.cost}
                  onChange={handleInputChange}
              />
              {errors.cost && <div className="error-message">{errors.cost}</div>}
            </label>
            <label>
              Rate:
              <input type="text" name="rate" value={newTeamMember.rate} onChange={handleInputChange} />
              {errors.rate && <div className="error-message">{errors.rate}</div>}
            </label>
            <label>
              Password:
              <input
                  type="password"
                  name="password"
                  value={newTeamMember.password}
                  onChange={handleInputChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </label>
            <button type="button" onClick={handleAddTeamMember}>
              Add Team Member
            </button>
          </form>
        </div>

        {organizingTeam.length > 0 && (
            <div>
              <h2>Added Team Members</h2>
              {organizingTeam.map((member, index) => (
                  <div key={index} className="team-member-box">
                    <strong>{member.name}</strong>
                    <strong>ID: {member.id}</strong>
                    <p>Hiring Cost: {member.hiringcost}$</p>
                    <p>Rate: {member.rate}</p>
                    {/* Omit password from display for security reasons */}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default AddOrgTeam;
