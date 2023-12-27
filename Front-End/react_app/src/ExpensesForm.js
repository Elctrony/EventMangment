import React, { useState } from 'react';
import './ExpensesForm.css';

const  ExpenseModalForm = ({ onSubmit, onClose }) => {
    const [expenseData, setExpenseData] = useState({
        itemname: '',
        quantity: 1,
        price: '',
        description: '',
        expenseType: 0, // Default to 0 (expenses)
    });

    const [errors, setErrors] = useState({
        itemname: '',
        quantity: '',
        price: '',
        expenseType: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setExpenseData({
            ...expenseData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        });
        setErrors({
            ...errors,
            [name]: '', // Clear previous error when user changes the input
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!expenseData.itemname.trim()) {
            newErrors.itemname = 'Item Name is required';
            isValid = false;
        }

        if (expenseData.quantity <= 0) {
            newErrors.quantity = 'Quantity must be greater than 0';
            isValid = false;
        }

        if (isNaN(expenseData.price)) {
            newErrors.price = 'Price must be a valid number';
            isValid = false;
        }


        // Add additional validation rules as needed

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(expenseData);
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Expense</h2>
                <form>
                    <label>
                        Item Name:
                        <input
                            type="text"
                            name="itemname"
                            value={expenseData.itemname}
                            onChange={handleInputChange}
                        />
                        <span className="error red-text">{errors.itemname}</span>
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={expenseData.quantity}
                            onChange={handleInputChange}
                        />
                        <span className="error red-text">{errors.quantity}</span>
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={expenseData.price}
                            onChange={handleInputChange}
                        />
                        <span className="error red-text">{errors.price}</span>
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={expenseData.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Expense Type:
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="expenseType"
                                    value="0"
                                    checked={expenseData.expenseType === "0"}
                                    onChange={handleInputChange}
                                />
                                Expenses
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="expenseType"
                                    value="1"
                                    checked={expenseData.expenseType === "1"}
                                    onChange={handleInputChange}
                                />
                                Fund
                            </label>
                        </div>
                        <span className="error red-text">{errors.expenseType}</span>
                    </label>
                    <div className="button-container">
                        <button className="add-btn" type="button" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="delete-btn" type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseModalForm;
