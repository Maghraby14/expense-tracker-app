import { FlatList,Text } from "react-native";
import ExpensesItem from "./ExpensesItem";

function renderexpenseItem(itemData){
    return <ExpensesItem description={itemData.item.description} 
    amount={itemData.item.amount}
    date={itemData.item.date}
    id={itemData.item.id}
    />
}
function ExpensesList({expenses}){
return <FlatList data={expenses} renderItem={renderexpenseItem} keyExtractor={(item)=> item.id }/>
}
export default ExpensesList;
