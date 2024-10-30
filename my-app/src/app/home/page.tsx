"use client"
import {useState} from 'react';

interface Expense {
  id: number;
  name: string;
  amount: number;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = () => {
    const newExpense: Expense = {
      id: expenses.length + 1,
      name: newExpenseName,
      amount: newExpenseAmount,
    };
    setExpenses([...expenses, newExpense]);
    setNewExpenseName('');
    setNewExpenseAmount(0);
    setTotal(total + newExpenseAmount);
  };

  const handleDeleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter((expense: { id: number; }) => expense.id !== id);
    setExpenses(updatedExpenses);
    const deletedExpense = expenses.find((expense: { id: number; }) => expense.id === id);
    if (deletedExpense) {
      setTotal(total - deletedExpense.amount);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setIsEditing(true);
    setEditingExpense(expense);
    setNewExpenseName(expense.name);
    setNewExpenseAmount(expense.amount);
  };

  const handleUpdateExpense = () => {
    if (editingExpense) {
      const updatedExpenses = expenses.map((expense: { id: any; }) => {
        if (expense.id === editingExpense.id) {
          return {
            id: expense.id,
            name: newExpenseName,
            amount: newExpenseAmount,
          };
        }
        return expense;
      });
      setTotal(
        total - editingExpense.amount + newExpenseAmount
      );
      setIsEditing(false);
      setEditingExpense(null);
      setNewExpenseName('');
      setNewExpenseAmount(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-24 bg-white rounded-md shadow-xl">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
      <form className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Expense Name:</label>
        <input
          type="text"
          value={newExpenseName}
          onChange={(e) => setNewExpenseName(e.target.value)}
          className="p-2 border border-gray-400 rounded-md mb-4"
        />
        <label className="text-lg font-bold mb-2">Expense Amount:</label>
        <input
          type="number"
          value={newExpenseAmount}
          onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        {isEditing ? (
          <button
            type="button"
            onClick={handleUpdateExpense}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Update Expense
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddExpense}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Expense
          </button>
        )}
      </form>
      <h2 className="text-2xl font-bold mb-4">Expenses:</h2>
      <ul className="list-none mb-4">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-lg">{expense.name}</span>
            <span className="text-lg">${expense.amount}</span>
            <button
              type="button"
              onClick={() => handleEditExpense(expense)}
              className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-3xl mr-2"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteExpense(expense.id)}
              className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-2xl"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-4">Total: ${total}</h2>
    </div>
  );
};

export default ExpenseTracker;































































// 'use client'
// import { useState, useEffect } from 'react';

// interface Expense {
//   id: string;
//   title: string;
//   amount: number;
//   category: string;
//   date: Date;
//   note: string;
// }

// interface Category {
//   name: string;
//   amount: number;
// }

// const categories = [
//   { name: 'Food', amount: 0 },
//   { name: 'Transport', amount: 0 },
//   { name: 'Bills', amount: 0 },
//   { name: 'Education', amount: 0 },
//   { name: 'Investments', amount: 0 },
//   { name: 'Luxuries', amount: 0 },
//   { name: 'Other', amount: 0 },
// ];

// const ExpenseTracker = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [category, setCategory] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [note, setNote] = useState('');
//   const [categoryBreakdown, setCategoryBreakdown] = useState<Category[]>(categories);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

//   useEffect(() => {
//     const storedExpenses = localStorage.getItem('expenses');
//     if (storedExpenses) {
//       setExpenses(JSON.parse(storedExpenses));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//   }, [expenses]);

//   useEffect(() => {
//     const breakdown = categories.map((cat) => {
//       const amount = expenses.reduce((acc, expense) => {
//         if (expense.category === cat.name) {
//           return acc + expense.amount;
//         }
//         return acc;
//       }, 0);
//       return { name: cat.name, amount };
//     });
//     setCategoryBreakdown(breakdown);
//   }, [expenses]);

//   const handleAddExpense = () => {
//     const newExpense: Expense = {
//       id: Math.random().toString(),
//       title,
//       amount,
//       category,
//       date,
//       note,
//     };
//     setExpenses([...expenses, newExpense]);
//     setTitle('');
//     setAmount(0);
//     setCategory('');
//     setDate(new Date());
//     setNote('');
//   };

//   const handleEditExpense = () => {
//     if (currentExpense) {
//       const updatedExpenses = expenses.map((expense) => {
//         if (expense.id === currentExpense.id) {
//           return { ...expense, title, amount, category, date, note };
//         }
//         return expense;
//       });
//       setExpenses(updatedExpenses);
//       setIsEditing(false);
//       setCurrentExpense(null);
//       setTitle('');
//       setAmount(0);
//       setCategory('');
//       setDate(new Date());
//       setNote('');
//     }
//   };

//   const handleDeleteExpense = (id: string) => {
//     const updatedExpenses = expenses.filter((expense) => expense.id !== id);
//     setExpenses(updatedExpenses);
//   };

//   const handleEdit = (expense: Expense) => {
//     setIsEditing(true);
//     setCurrentExpense(expense);
//     setTitle(expense.title);
//     setAmount(expense.amount);
//     setCategory(expense.category);
//     setDate(expense.date);
//     setNote(expense.note);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
//       <div className="flex flex-col md:flex-row justify-between gap-4">
//         <div className="flex-1">
//           <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
//           <form>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                 Title
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
//                 Amount
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="amount"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//                 Category
//               </label>
//               <select
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.name} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                 Date
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="date"
//                 type="date"
//                 value={date.toISOString().split('T')[0]}
//                 onChange={(e) => setDate(new Date(e.target.value))}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
//                 Note
//               </label>
//               <textarea
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="note"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//               />
//             </div>
//             {isEditing ? (
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="button"
//                 onClick={handleEditExpense}
//               >
//                 Edit Expense
//               </button>
//             ) : (
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="button"
//                 onClick={handleAddExpense}
//               >
//                 Add Expense
//               </button>
//             )}
//           </form>
//         </div>
//         <div className="flex-1">
//           <h2 className="text-2xl font-bold mb-4">Expenses</h2>
//           <ul>
//             {expenses.map((expense) => (
//               <li key={expense.id} className="mb-4">
//                 <div className="flex justify-between">
//                   <span>{expense.title}</span>
//                   <span>${expense.amount}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Category: {expense.category}</span>
//                   <span>Date: {expense.date.toISOString().split('T')[0]}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Note: {expense.note}</span>
//                   <div>
//                     <button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       type="button"
//                       onClick={() => handleEdit(expense)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       type="button"
//                       onClick={() => handleDeleteExpense(expense.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {/* <div className="mt-4">
//         <h2 className="text-2xl font-bold mb-4">Category Breakdown</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={categoryBreakdown}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div> */}
//     </div>
//   );
// };

// export default ExpenseTracker;









