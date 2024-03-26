import { useContext, useLayoutEffect,useState } from "react";
import { Text, View,StyleSheet } from "react-native";
import IconButton from "../Components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../Components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExoenseForm from "../Components/ManegeExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../Components/UI/LoadingOverlay";
import ErrorOverlay from "../Components/UI/ErrorOverlay";
function ManegeExpenses({route,navigation}){
    const [isFetching,setisFetching] = useState(false);
    const [isError,setError] = useState();
    const editedExpenseId = route.params?.expennseId;
    const isEditing = !!editedExpenseId; //return true if editing false if not
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    },[navigation,isEditing]);
    const expensesctx = useContext(ExpensesContext);
    const selectedExpense=expensesctx.expenses.find((expense)=> expense.id === editedExpenseId);




    async function deleteExpenseHandler(){
        setisFetching(true);
        try{
            await deleteExpense(editedExpenseId);
            expensesctx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }
        catch(err){
            setError("Couldn't delete expense please try again later");
            setisFetching(false);
        }
        
        
       
        
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setisFetching(true);
        try{
            if(isEditing){
                expensesctx.updateExpense(editedExpenseId,expenseData);
                await updateExpense(editedExpenseId, expenseData)}
            else{   
                const id =await storeExpense(expenseData);
                expensesctx.addExpense({...expenseData,id:id});}
                
                navigation.goBack();
        }
        catch(err){
            setError("Couldn't confirm expense please try again later");
            setisFetching(false);
        }
       
       
    }
    if (isFetching){
        return <LoadingOverlay />;
    }
    else if(!isFetching && isError){
        return <ErrorOverlay message={isError} onConfirm={()=>setError(null)}/>
    }
    else{
        return <View style={styles.container}> 
        <ExoenseForm 
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onSubmit={confirmHandler}
        deaultValues={selectedExpense}
        />
        
        {
          
              isEditing && 
             ( <View style={styles.deleteContainer}>
                <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>
                ) 
              

        }
    </View>;
    } 
    
}
export default ManegeExpenses;
const styles = StyleSheet.create({
    container:{
        flex: 1,padding:24,backgroundColor:GlobalStyles.colors.primary800
    },
    deleteContainer:{
marginTop:16,paddingTop:8,borderTopWidth:2,
borderTopColor:GlobalStyles.colors.primary200,alignItems: 'center'
    },
    
});