import { View } from "react-native"
import Advice from "../components/Advice"
import Menu from "../components/Menu";

const AdviceScreen = () => {
    return (
        <View style={styles.container}>
            <Advice />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0
    }
}

export default AdviceScreen;