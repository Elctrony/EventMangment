import React, { useState, useEffect } from 'react';

import './ProjectStatistics'
import moment from "moment/moment";
const OrganizerTable = () => {
    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        // Fetch the organizers data or set it with your actual data
        // Replace the following with your actual data fetching logic


        fetch('http://localhost:8080/dashboard/organizer-table').then(response => response.json()).then(data => {

            let organizerData = data.organizerTable;

            setOrganizers(organizerData);

        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="project-statistics-container">
            <h2>Organizer Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Organizing Team ID</th>
                    <th>Organizing Team Name</th>
                    <th>Number of Events</th>
                </tr>
                </thead>
                <tbody>
                {organizers.map((organizer) => (
                    <tr key={organizer.id}>
                        <td>{organizer.id}</td>
                        <td>{organizer.team_name}</td>
                        <td>{organizer.event_count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrganizerTable;
