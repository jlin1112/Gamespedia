import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from './Detail';
import Home from './Home';



const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    );
  }