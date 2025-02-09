import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('CustomScreen')}>
                    {
                        activeButton === 'CustomScreen' ? (
                            <LinearGradient
                                colors={['#ffcf2c', '#d46a00']}
                                style={styles.button} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <View style={{width: 40, height: 40}}>
                                    <Icons type={'1'} active={activeButton === 'CustomScreen'}/>
                                </View>
                            </LinearGradient>
                        ) : (
                            <View style={{width: 40, height: 40}}>
                                <Icons type={'1'} active={activeButton === 'CustomScreen'}/>
                            </View>        
                        )
                    }
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('HomeScreen')}>
                    {
                        activeButton === 'HomeScreen' ? (
                            <LinearGradient
                                colors={['#ffcf2c', '#d46a00']}
                                style={styles.button} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <View style={{width: 40, height: 40}}>
                                    <Icons type={'2'} active={activeButton === 'HomeScreen'}/>
                                </View>
                            </LinearGradient>
                        ) : (
                            <View style={{width: 40, height: 40}}>
                                <Icons type={'2'} active={activeButton === 'HomeScreen'}/>
                            </View>        
                        )
                    }
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('AdviceScreen')}>
                    {
                        activeButton === 'AdviceScreen' ? (
                            <LinearGradient
                                colors={['#ffcf2c', '#d46a00']}
                                style={styles.button} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <View style={{width: 40, height: 40}}>
                                    <Icons type={'3'} active={activeButton === 'AdviceScreen'}/>
                                </View>
                            </LinearGradient>
                        ) : (
                            <View style={{width: 40, height: 40}}>
                                <Icons type={'3'} active={activeButton === 'AdviceScreen'}/>
                            </View>        
                        )
                    }
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 280,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        borderRadius: 22,
        padding: 1,
        height: 72,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    
    button: {
        width: 86,
        height: 71,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
    }
});

export default Menu;
