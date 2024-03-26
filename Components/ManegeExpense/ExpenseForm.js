import { View ,StyleSheet,Text, Alert} from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/style";
function ExoenseForm({onCancel,onSubmit,submitButtonLabel,deaultValues}){
    const [inputs,setinputs]=useState({

        amount: {value:deaultValues ? deaultValues.amount.toString() : '' ,isValid: true,},//deaultValues ? true : false},

        date:{value:deaultValues ? getFormattedDate(deaultValues.date): '',isValid: true,},//!!deaultValues },

        description: {value:deaultValues ? deaultValues.description:'', isValid: true,}//!!deaultValues}
    });


    function inputChangeHandler(inputidentifier,enteredValue){
        
        
        setinputs((current)=>{
            return {
                ...current,
                [inputidentifier]:{value:enteredValue,isValid:true}
            }
        });

    }
    function onSubmitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,date:new Date(inputs.date.value),description:inputs.description.value
        }



        const amountisValid = !isNaN(expenseData.amount) && expenseData.amount >0 ;
        const dateisValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionisValid = expenseData.description.trim().length >0 ;
        if(!amountisValid || !descriptionisValid || !dateisValid){
            //Alert.alert('Invalid input ', 'Please Check your input values');
            setinputs((currentinputs)=>{
                return{
                    amount:{value:currentinputs.amount.value,isValid:amountisValid},
                    date:{value:currentinputs.date.value,isValid:dateisValid},
                    description:{value:currentinputs.description.value,isValid:descriptionisValid},
                }
            })
            
            
            
            return;
        }

        onSubmit(expenseData);
    }


const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid; 
return <View style={styles.form}>
    <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
        <Input label='Amount'  style={styles.rowInput} invalid={!inputs.amount.isValid} textInputConfig={{
            keyboardType:'decimal-pad',
            onChangeText:inputChangeHandler.bind(this,'amount'),
            value:inputs.amount.value,
            multiline: false,

        }}/>
        <Input label='Date'
        style={styles.rowInput}
        invalid={!inputs.date.isValid}
        textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangeHandler.bind(this,'date'),
            value:inputs.date.value,
            multiline: false,
        }}
        />
        </View>
        <Input label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
            multiline: true,
            //autoCorrect: false,
            //autoCapitalize: '',
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputs.description.value,
        }}
        />
        {formIsInValid && <Text style={styles.errortext}> Invalid input Values Please Check your input data</Text>}
        <View style={styles.buttons}>
            <Button style={styles.btn} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.btn} onPress={onSubmitHandler}>{submitButtonLabel}</Button>
        </View>
       </View>
}
export default ExoenseForm;
const styles = StyleSheet.create({
    inputRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput:{
        flex:1
    },
    form:{
        marginTop:80
    },
    title:{fontSize:24,fontWeight:'bold',color:'white',marginVertical:24,textAlign:'center'},
    buttons:{flexDirection:'row',justifyContent: 'center',alignItems: 'center'},
    btn:{minWidth:120,marginHorizontal:8},
    errortext:{ textAlign:'center',color:GlobalStyles.colors.error500,margin:8}
});