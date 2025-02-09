import { View } from "react-native"
import Custom from "../components/Custom"
import Menu from "../components/Menu";

const CustomScreen = () => {
    return (
        <View style={styles.container}>
            <Custom />
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

export default CustomScreen;