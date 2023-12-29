import React, {useEffect, useState} from 'react';
import './OrgSelection.css';


import {useLocation, useNavigate} from "react-router-dom";
const SelectConfirmationModal = ({isOpen, onCancel, onConfirm }) => {
  return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h2>Confirm Selection</h2>
          <p>Are you sure you want to Delete this Team?</p>
          <div className="modal-buttons">
            <button className="close-modal-button" onClick={onConfirm}>
              Yes, Delete
            </button>
            <button className="submit-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};
const OrganizingItem = (member,handleSelect,index) => {

  return (
      <>
        <div
            key={index}
            className={`team-box ${member.isSelected ? 'selected' : ''}`}
            onClick={handleSelect}
        >
          <strong>{member.name}</strong>
          <p>Rating: {member.rate}/10</p>
          <p>Cost of Hiring: {member.hiringcost}$</p>
        </div>

      </>
  );
};
let selectInd=-1;
let selectId = -1;
const OrganizingTeamPage = () => {

  const [orgranzingTeams,setOrganizingTeams]=useState([]);
  const [selectedMember, setSelectMemeber] = useState(false)
  const navigate = useNavigate();





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/organizingTeams');
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} - ${response.statusText}`;
          alert(errorMessage);
          return;
        }

        const data = await response.json();
        let org = JSON.parse(data);
        const orgTeams = org.map((team) => ({ ...team, isSelected: false }));
        console.log(orgTeams);
        setOrganizingTeams(orgTeams);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again.');
        // You can add additional error handling as needed
      }
    };

    fetchData();
  }, []);

  const confirmSelectTeam =async () => {
    console.log(selectInd,"Confirm");
    if(selectId===-1||selectInd===-1){
      setSelectMemeber(false);
      return;
    }

    let respone= await fetch('http://localhost:8080/dashboard/delete-organizer',{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:selectId
      })
    });
    if(respone.status!==200){
      alert("Request Failed");
      return;
    }
    orgranzingTeams[selectInd].isSelected=false;
    let newOrgTeams = orgranzingTeams.filter((team)=>team.id!==selectId);
    setOrganizingTeams(newOrgTeams);
    selectInd=-1;
    selectId=-1
    setSelectMemeber(false);

  };

  const closeDeleteModal = () => {
    if(selectId===-1||selectInd===-1){
      setSelectMemeber(false);
      return;
    }
    console.log(selectInd,"Close");
    orgranzingTeams[selectInd].isSelected=false;
    setOrganizingTeams(orgranzingTeams);
    selectInd=-1;
    selectId=-1
    setSelectMemeber(false);
  };
  const handleClick = (index,id)=>{

      console.log(index,"Clicked");
      orgranzingTeams[index].isSelected=true;
      selectInd = index;
      selectId = id;
      console.log("IDX: ",selectInd,"Clicked");
      console.log("ID: ",selectId,"Clicked");
      setOrganizingTeams(orgranzingTeams);
      setSelectMemeber(true)
  };

  return (
      <>
    <div>
      <h1>Select An Organizing Team</h1>
      <div className="team-container">
        {orgranzingTeams.map((member,index) => (
            OrganizingItem(member,()=>handleClick(index,member.id),index)
        ))}
      </div>

    </div>
        {selectedMember && (
            <SelectConfirmationModal
                isOpen={selectedMember}
                onConfirm={confirmSelectTeam}
                onCancel={closeDeleteModal}
            />
        )}
      </>
  );
};

export default OrganizingTeamPage;
