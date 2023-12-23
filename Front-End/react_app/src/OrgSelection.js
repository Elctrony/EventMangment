import React, { useState } from 'react';
import './OrgSelection.css';

const OrganizingTeamPage = () => {
  const organizingTeamMembers = [
    { id: 1, name: 'Team Member 1', rate: 8, costOfHiring: '$500' },
    { id: 2, name: 'Team Member 2', rate: 7, costOfHiring: '$400' },
    { id: 3, name: 'Team Member 3', rate: 9, costOfHiring: '$450' },
    { id: 4, name: 'Team Member 4', rate: 9, costOfHiring: '$450' },
    { id: 5, name: 'Team Member 5', rate: 9, costOfHiring: '$450' },
    { id: 6, name: 'Team Member 6', rate: 9, costOfHiring: '$450' },
    { id: 7, name: 'Team Member 7', rate: 9, costOfHiring: '$450' },
    { id: 8, name: 'Team Member 8', rate: 9, costOfHiring: '$450' },
  ];

  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };
  const handleSelectTeam = (member) => {
    console.log(member.id);
  }

  return (
    <div>
      <h1>Select An Organizing Team</h1>
      <div className="team-container">
        {organizingTeamMembers.map((member) => (
          <div
            key={member.id}
            className={`team-box ${selectedMember && selectedMember.id === member.id ? 'selected' : ''}`}
            onClick={() => handleSelectMember(member)}
          >
            <strong>{member.name}</strong>
            <p>Rating: {member.rate}/10</p>
            <p>Cost of Hiring: {member.costOfHiring}</p>
          </div>
        ))}
      </div>

      {selectedMember && (
        <div>
          <h2>Selected Organizing Team</h2>
          <p>Name: {selectedMember.name}</p>
          <p>Rating: {selectedMember.rate}/10</p>
          <p>Cost of Hiring: {selectedMember.costOfHiring}</p>
          <button style={{fontFamily:'revert-layer'}} onClick={() => handleSelectTeam(selectedMember)}>Confirm Team</button>
        </div>
      )}
    </div>
  );
};

export default OrganizingTeamPage;
