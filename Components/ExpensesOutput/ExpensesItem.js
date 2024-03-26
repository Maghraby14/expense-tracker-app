import { Pressable, View ,StyleSheet,Text} from "react-native";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
function ExpensesItem({id,description,amount,date}){
    const navigation = useNavigation();
    function expenssPressHandler(){
        navigation.navigate('Manege Expense',{
            expennseId:id
        });

    }
    return <Pressable onPress={expenssPressHandler}
    style={({pressed})=> pressed && styles.pressed }
    >
        <View style={styles.expenseitem}>
            <View>
                <Text style={[styles.textbase,styles.description]}>
                    {description}
                </Text>
                <Text style={styles.textbase}>
                    {getFormattedDate(date)}
                </Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                    {amount.toFixed(2)}
                </Text>
            </View>
        </View>
    </Pressable>
}
export default ExpensesItem;
const styles = StyleSheet.create({
    expenseitem:{
        padding:12,marginVertical:8,backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',justifyContent:'space-between',borderRadius:6,elevation:3,
        shadowColor:GlobalStyles.colors.gray500,shadowRadius:4,
        shadowOffset:{width:1,height:1},shadowOpacity:0.4
    },
    textbase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize:16,marginBottom:4,fontWeight:'bold'
    },
    amountContainer:{
        paddingHorizontal:12,paddingVertical:4,backgroundColor:'white',
        justifyContent:'center',alignItems:'center',borderRadius:4,minWidth:80
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    },pressed:{opacity:0.75}


});