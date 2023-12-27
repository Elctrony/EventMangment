import React, { useState } from 'react';
import './AddOrgTeam.css'; 

const AddOrgTeam = () => {
  const [organizingTeam, setOrganizingTeam] = useState([]);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    hiringCost: '',
    rate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleAddTeamMember = () => {
    setOrganizingTeam((prevTeam) => [...prevTeam, newTeamMember]);
    setNewTeamMember({
      name: '',
      hiringCost: '',
      rate: '',
    });
  };

  return (
    <div>
      <h1>Organizing Team Management</h1>
      <div>
        <h2>Add New Team Member</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={newTeamMember.name} onChange={handleInputChange} />
          </label>
          <label>
            Hiring Cost:
            <input type="text" name="hiringCost" value={newTeamMember.hiringCost} onChange={handleInputChange} />
          </label>
          <label>
            Rate:
            <input type="text" name="rate" value={newTeamMember.rate} onChange={handleInputChange} />
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
              <p>Hiring Cost: {member.hiringCost}</p>
              <p>Rate: {member.rate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddOrgTeam;
