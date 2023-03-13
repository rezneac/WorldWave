import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/screen/MainScreen";
import RadioStation from "./src/components/radioStation";

const navigator = createStackNavigator(
  {
    Main: MainScreen,   
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      title: "WorldWave Radio",
      headerTintColor: "white",
      headerStyle: { elevation: 0, backgroundColor: "#122d42" },

      cardStyle: { backgroundColor: "#3e6b89" },

    },
  }
);

export default createAppContainer(navigator);
