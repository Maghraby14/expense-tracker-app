import { Text } from "react-native";
import ExpensesOutput from "../Components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getdateMinusDats } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import ErrorOverlay from "../Components/UI/ErrorOverlay";
function RecentExpenses({navigation}){
    const [isFetching,setisFetching] = useState(true);
    const [isError,setError] = useState();
    const expensesctx = useContext(ExpensesContext);
    const [fetchedExpenses,setFetchedExpenses] = useState([]);
    useEffect(()=>{
        async function getExpenses(){
            setisFetching(true);
            try{
                const expenses=await fetchExpense();
                expensesctx.setExpenses(expenses);
            }
            catch(error){
                setError("Couldn't fetch expenses");
            }
            setisFetching(false);
            
        }
        getExpenses();
    },[navigation]);
    function errorhandler(){
        setError(null);
    }
    if (isError && !isFetching){
        return <ErrorOverlay message={isError} onConfirm={errorhandler}/>
    }
    if (isFetching){
        return <LoadingOverlay />
    }

    const recentExpenses = expensesctx.expenses.filter((expense)=>{
        const today = new Date();
        const date7daysago =getdateMinusDats(today, 7);
        return expense.date > date7daysago;
    })
    return <ExpensesOutput periodName='Last 7 days' expenses={recentExpenses } fall='No Recent Expenses'/>;

}
export default RecentExpenses;