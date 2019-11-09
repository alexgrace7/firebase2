import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import App from './App.js'
import map from './components/Map'

const AppNavigator = createStackNavigator(
    {
    App: { screen: App },
    Map: {screen: map },
    },
    {
    initialRouteName: 'App',
    }
    );
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;