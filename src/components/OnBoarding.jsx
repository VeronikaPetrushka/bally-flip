import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 4);

        if(componentIndex === 3) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <View style={styles.container}>

            {
                componentIndex === 0 || componentIndex === 2 ?
                (
                    <Image source={require('../assets/head.png')} style={styles.image} />
                ) : (
                    <Image source={require('../assets/tail.png')} style={styles.image} />
                )
            }

            <View style={styles.infoContainer}>
                
                <Text style={styles.title}>
                    {
                        componentIndex === 0 ? 'Welcome to Bally Flip! 🎉'
                        : componentIndex === 1 ? 'What can you do with Bally Flip?' 
                        : componentIndex === 2 ? 'Just a few simple steps'
                        : 'In Bally Flip, you can:'
                    }
                </Text>

                {
                    componentIndex === 0 && (
                        <Text style={[styles.text, {marginBottom: height * 0.025}]}>Make quick decisions and resolve debates effortlessly with a simple coin flip or random choices. Ready to give it a try?</Text>
                    )
                }

                {
                    componentIndex === 1 && (
                        <View style={{width: '100%', marginBottom: height * 0.025}}>
                            <Text style={styles.text}>✔ Flip a coin for instant decisions</Text>
                            <Text style={styles.text}>✔ Choose between your custom options</Text>
                            <Text style={styles.text}>✔ Get random advice from Bally</Text>
                        </View>
                    )
                }

                {
                    componentIndex === 2 && (
                        <View style={{width: '100%', marginBottom: height * 0.025}}>
                            <Text style={styles.text}>1️ - Choose a mode: Coin flip, Custom options, or Advice</Text>
                            <Text style={styles.text}>2️ - Tap the button to make a decision</Text>
                            <Text style={styles.text}>3️ - Share your results with friends!"</Text>
                        </View>
                    )
                }

                {
                    componentIndex === 3 && (
                        <View style={{width: '100%', marginBottom: height * 0.025}}>
                            <Text style={styles.text}>✨ Add your own options for decisions</Text>
                            <Text style={styles.text}>✨ Share your results with friends!</Text>
                            <Text style={styles.text}>✨ Switch the mode</Text>
                        </View>
                    )
                }

                    <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                        <Text style={styles.btnText}>{
                            componentIndex === 0 ? 'Continue' : 
                            componentIndex === 1 || componentIndex === 2 ? 'Next' :
                            'Start now!'
                        }</Text>
                    </TouchableOpacity>

            </View>

            <View style={styles.dotsContainer}>
                {[0, 1, 2, 3].map((index) => (
                    <View 
                        key={index}
                        style={[
                            styles.dot,
                            componentIndex === index ? styles.activeDot : null
                        ]}
                    />
                ))}
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 22,
        paddingTop: height * 0.07,
        backgroundColor: '#2e1212'
    },

    image: {
        width: 300,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: 42,
        marginTop: 32
    },

    infoContainer: {
        width: '100%',
        padding: 22,
        backgroundColor: '#562c2c',
        borderRadius: 22
    },

    title: {
        fontWeight: '600',
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.02,
        lineHeight: 29.26
    },

    text: {
        fontWeight: '400',
        fontSize: 17,
        color: '#fff',
        marginBottom: 7,
        lineHeight: 20.72
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#fdc300',
        padding: 20
    },

    btnText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#2e1212',
        lineHeight: 22
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },

    dot: {
        width: 14,
        height: 14,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#562c2c',
    },

    activeDot: {
        backgroundColor: '#fdc300',
    },

})

export default OnBoarding;