import React, { useState, useEffect } from 'react';
import './ProjectStatistics.css'; // Import your CSS file for styling

const ProjectStatistics = () => {
    const [statistics, setStatistics] = useState({
        numberOfEvents: 0,
        numberOfAttendees: 0,
        numberOfAgendaSessions: 0,
        maxFunding: 0,
        maxExpenses: 0,
    });

    useEffect(() => {
        // Fetch the data or calculate statistics here
        // Replace the following with your actual data fetching logic

        // Example data

        fetch('http://localhost:8080/dashboard/statistics').then(response => response.json()).then(data => {
            /* data sample looks like:  "statistics": {
        "events": "12",
        "attendee": "22",
        "agenda": "6",
        "expenses": "6000.00",
        "funding": "4000.00"
    }
            */
            // Calculate statistics

            console.log(data);
            const totalEvents = data.statistics.events;
            const totalAttendees = data.statistics.attendee;
            const totalAgendaSessions = data.statistics.agenda
            const maxFunding =data.statistics.funding;
            const maxExpenses = data.statistics.expenses;

            setStatistics({
                numberOfEvents: totalEvents,
                numberOfAttendees: totalAttendees,
                numberOfAgendaSessions: totalAgendaSessions,
                maxFunding: maxFunding,
                maxExpenses: maxExpenses,
            });

        });

    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="project-statistics-container">
            <h2>Project Statistics</h2>
            <table>
                <tbody>
                <tr>
                    <th>Number of Events</th>
                    <th>Number of Attendees</th>
                    <th>Number of Agenda Sessions</th>
                    <th>Max Funding</th>
                    <th>Max Expenses</th>
                </tr>
                <tr>
                    <td>{statistics.numberOfEvents}</td>
                    <td>{statistics.numberOfAttendees}</td>
                    <td>{statistics.numberOfAgendaSessions}</td>
                    <td>${statistics.maxFunding}</td>
                    <td>${statistics.maxExpenses}</td>

                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProjectStatistics;
