// ExpenseList.js
import React, {useEffect, useState} from 'react';
import './ExpenseList.css'; // Import a CSS file for styling
import ExpenseModalForm from './ExpensesForm';
import {useParams} from "react-router-dom";


const ExpenseList = ({ expenses, onDelete }) => {

    return (
        <div className="expense-list-container">
            <ul className="expense-list">
                {expenses.map((expense, index) => (
                    <li
                        key={index}
                        className={`expense-item ${expense.expensesType  ? 'ingoing' : 'outgoing'}`}
                    >
                        <div className="expense-details">
                            <span className="item-name">{expense.itemname}</span>
                            <span className="quantity">Quantity: {expense.quantity}</span>
                            <span className="price">Price: {expense.price} USD</span>
                            <span className="description">Description: {expense.description}</span>
                        </div>
                        <span className="amount">{expense.price*expense.quantity} EGP</span>
                        <button onClick={() => onDelete(index,expense.id)} className="delete-btn">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const EventExpenses = () => {

    const {id}= useParams();
    let eventID = parseInt(id);
    console.log("From Expenses: "+eventID);

    const [eventExpenses, setEventExpenses] = useState([]);

    const [isModalVisible, setModalVisibility] = useState(false);

    const handleDeleteExpense =async (index,eid) => {
        console.log('Expense id: ',eid);
        let body ={
            id:eid
        };
        console.log(body);
        try{
            let respone = await fetch('http://localhost:8080/expense',{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
            });
            if(respone.status!==200){
                alert("There is an error in the request");
                return;
            }
        }catch (e) {
            console.log(e);
            alert("There is an error in the request");
            return;
        }
        const updatedExpenses = [...eventExpenses];
        updatedExpenses.splice(index, 1);
        setEventExpenses(updatedExpenses);
    };

    const handleAddExpense = async (newExpense) => {
        let reqbody={

            "eventID":eventID,
            "itemName":newExpense.itemname,
            "quantity":newExpense.quantity,
            "price":newExpense.price,
            "description":newExpense.description,
            "type": newExpense.expenseType === "1"
        };
        newExpense.expensesType= newExpense.expenseType === "1";
        console.log(reqbody)
        try{
            let response= await fetch('http://localhost:8080/add-expenses',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqbody)
            });
            console.log(response);
            if(response.status!==201){

                alert("Data failed in Insertion");
                return;
            }
            setEventExpenses([...eventExpenses, newExpense]);
        }catch (e) {
            console.log(e);
            alert("Data failed in Insertion");

        }


    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`http://localhost:8080/expenses/${eventID}`);
                if (response.status === 200) {
                    let data = await response.json();
                    let expenses = JSON.parse(data);
                    console.log(expenses);
                    setEventExpenses(expenses);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error.message);
                alert('Failed to fetch data');
            }
        };

        fetchData();
    }, [eventID]);
    const openModal = () => {
        setModalVisibility(true);
    };

    const closeModal = () => {
        setModalVisibility(false);
    };

    return (
        <div>
            <h1>Event Expenses Overview</h1>
            <ExpenseList expenses={eventExpenses} onDelete={handleDeleteExpense} />
            <button onClick={openModal} className="add-btn">
                Add Expenses
            </button>

            {isModalVisible ? (
                <ExpenseModalForm onSubmit={handleAddExpense} onClose={closeModal} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default EventExpenses;
