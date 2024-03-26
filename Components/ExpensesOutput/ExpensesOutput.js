import {Text,View,FlatList,StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/style';
function ExpensesOutput({expenses,periodName,fall}){
    let Content = <Text style={styles.txt}>{fall}</Text>;
    if(expenses.length >0){
        Content= <ExpensesList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={periodName}/>

            {Content}
            
        </View>
    );
}
export default ExpensesOutput;
const styles = StyleSheet.create({
    container:{
        flex: 1,backgroundColor:GlobalStyles.colors.primary700,
        paddingHorizontal:24,paddingTop:24,paddingBottom:0
    },
    txt:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
});