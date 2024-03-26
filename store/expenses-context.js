import { createContext,useReducer } from "react";
const ExpensesData =[
    {
        id:'el',
        description:'Bannans',
        amount:100.29,
        date:new Date('2024-03-05')
    },
    {
        id:'e2',
        description:'Vegtables',
        amount:200.50,
        date:new Date('2024-03-04')
    },
    {
        id:'e3',
        description:'Book',
        amount:122.29,
        date:new Date('2024-02-05')
    },
    {
        id:'e4',
        description:'Laptop',
        amount:500,
        date:new Date('2023-01-25')
    },
    {
        id:'e5',
        description:'Another book',
        amount:10.29,
        date:new Date('2021-05-06')
    },
    {
        id:'e6',
        description:'Bannans',
        amount:100.29,
        date:new Date('2024-03-05')
    },
    {
        id:'e7',
        description:'Vegtables',
        amount:200.50,
        date:new Date('2024-03-04')
    },
    {
        id:'e8',
        description:'Book',
        amount:122.29,
        date:new Date('2024-02-05')
    },
    {
        id:'e9',
        description:'Laptop',
        amount:500,
        date:new Date('2023-01-25')
    },
    {
        id:'e10',
        description:'Another book',
        amount:10.29,
        date:new Date('2021-05-06')
    },
]
export const ExpensesContext = createContext({
    expenses: [],
    addExpense:({description,amout,date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id,{description,amout,date})=>{},
    setExpenses:(expenses)=>{}
});
function expensesReducer(state,action){
    switch(action.type){
        case 'ADD':
            
            return [action.payload,...state];
        case 'UPDATE':
            const updatableExpenseIndex =state.findIndex((expense) => expense.id === action.payload.id);
           
            const updatableExpense = state[updatableExpenseIndex];
           
            const updatedItem = {...updatableExpense,...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            
            return updatedExpenses;
            
        case 'DELETE':
            return  state.filter((expense)=> expense.id !== action.payload)
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        default:
            return state;    
    }
}

function ExpensesContextProvider({children}){
    const [expensesState,dispatch]=useReducer(expensesReducer,[]);
    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData});
    }
    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id});
    }
    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE',payload:{id:id ,data:expenseData}});
    }
    function setExpenses(expenses){
        dispatch({type:'SET',payload:expenses});
    }
    const value={
        expenses: expensesState,
        setExpenses:setExpenses,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider;