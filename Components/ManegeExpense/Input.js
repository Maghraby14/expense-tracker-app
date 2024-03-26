import { Text, TextInput, View , StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/style";

function Input({label,textInputConfig,style,invalid}){
    let inputStyles=[styles.input];
    if(textInputConfig && textInputConfig.multiline)
    {
        inputStyles.push(styles.inputmultiline);
    }
    if (invalid){
        inputStyles.push(styles.invalidInput)
    }
 return <View style={[styles.inputContainer,style]}>
    <Text style={[styles.label,invalid && styles.invalidLabel]}>
        {label}
    </Text>
    <TextInput style={inputStyles} {...textInputConfig}/>
 </View>
}
export default Input;
const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,marginVertical:8,
    },
    label:{
        fontSize:12,color:GlobalStyles.colors.primary100
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,padding:6,borderRadius:6,
        fontSize:18,color:GlobalStyles.colors.primary700
    },
    inputmultiline:{
        minHeight:100,textAlignVertical:'top'
    },
    invalidLabel:{color:GlobalStyles.colors.error500},
    invalidInput:{backgroundColor:GlobalStyles.colors.error50}
});