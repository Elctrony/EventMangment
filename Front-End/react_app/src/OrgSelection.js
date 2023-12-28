import React, {useEffect, useState} from 'react';
import './OrgSelection.css';


import './DeleteConfirmationModal.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "./UserContext";
const SelectConfirmationModal = ({isOpen, onCancel, onConfirm }) => {
  return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h2>Confirm Selection</h2>
          <p>Are you sure you want to Select this Team?</p>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onConfirm}>
              Yes, Select
            </button>
            <button className="yes-delete-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};
const OrganizingItem = (member,handleSelect,index) => {
//  const [selectedMember, setSelectedMember] = useState(false);



  /*const confirmSelectTeam = () => {
    console.log(member.id);
    setSelectedMember(false);
  };

  const closeDeleteModal = () => {
    setSelectedMember(false);
  };*/

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



  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let eventId = queryParams.get('eventid');

  const {user,setUser} = useUser();


  if(!user||!user.id){
    navigate('/login');
  }

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
        console.log(org);
        const orgTeams = org.map((team) => ({ ...team, isSelected: false }));
        setOrganizingTeams(orgTeams);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again.');
        // You can add additional error handling as needed
      }
    };

    fetchData();
  }, []);
  const showAlert= ()=>{
    alert("You have to select Event first");
  }
  const confirmSelectTeam =async () => {
    console.log(selectInd,"Confirm");

    orgranzingTeams[selectInd].isSelected=false;
    setOrganizingTeams(orgranzingTeams);

    if(!eventId){
      showAlert()
      return;
    }
    let body={
      'orgteamid':selectId,
      'eventid':eventId
    }
    console.log(body);
    await fetch('http://localhost:8080/add-team-event',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    selectInd=-1;
    selectId=-1
    setSelectMemeber(false);

    navigate('/');
  };

  const closeDeleteModal = () => {
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
