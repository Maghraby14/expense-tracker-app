import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import  {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManegeExpenses from './Screens/ManegeExpenses';
import RecentExpenses from './Screens/RecentExpenses';
import AllExpenses from './Screens/AllExpenses';
import { GlobalStyles } from './constants/style';
import {Ionicons} from "@expo/vector-icons";
import IconButton from './Components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
const Stack =  createNativeStackNavigator();
const BottomsTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    
    <BottomsTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight:({tintColor})=> <IconButton icon='add' size={24} color={tintColor} onPress={()=>{navigation.navigate('Manege Expense');}}/>

    })}>
      <BottomsTabs.Screen name='RecentExpenses' component={RecentExpenses}
      options={{
        title:'Recent Expenses',
        tabBarLabel:'Recent',
        tabBarIcon:({color,size}) => <Ionicons name='hourglass' size={size} color={color}/>
      }}
      />
      <BottomsTabs.Screen name='AllExpenses' component={AllExpenses} 
      options={{
        title:'All Expenses',
        tabBarLabel:'All Expenses',
        tabBarIcon:({color,size}) => <Ionicons name='calendar' size={size} color={color}/>
      }}
      />
      
      
    </BottomsTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <ExpensesContextProvider>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
        headerTintColor:'white',
      }}
      >
      <Stack.Screen name='ExpensesOverview ' component={ExpensesOverview} 
      options={{headerShown:false}}
      />
      <Stack.Screen name='Manege Expense' component={ManegeExpenses} 
      options={{
        presentation:'modal'
      }}
      />
        
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
      
    
  );
}

