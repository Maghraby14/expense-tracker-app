import {Text} from 'react-native'
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput'
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
function AllExpenses(){
    const expensesctx=useContext(ExpensesContext);
    return <ExpensesOutput periodName='Total'  expenses={expensesctx.expenses} fall='No Expenses Found'/>;
}
export default AllExpenses;