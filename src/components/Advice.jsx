import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Animated } from "react-native";
import advices from '../constants/advices';

const { height } = Dimensions.get('window');

const Advice = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topicChosen, setTopicChosen] = useState(null);
    const [adviceChosen, setAdviceChosen] = useState(null);
    const [spinValue, setSpinValue] = useState(new Animated.Value(0));

    const handleChooseTopic = () => {
        if (selectedTopic) {
            setTopicChosen(selectedTopic);
        }
    };

    const handleSpin = () => {
        setAdviceChosen(null);

        Animated.timing(spinValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start(() => {
            const randomAdvice = topicChosen.advices[Math.floor(Math.random() * topicChosen.advices.length)];
            setAdviceChosen(randomAdvice);
            setSpinValue(new Animated.Value(0));
        });
    };

    const resetSelection = () => {
        setTopicChosen(null);
        setAdviceChosen(null);
    };

    const shareAdvice = () => {
        alert("Sharing advice: " + adviceChosen);
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.upperText}>Bally Advice mode</Text>
            </View>

            {!topicChosen && !adviceChosen && (
                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center'}}>
                    <Text style={styles.title}>Choose the category</Text>
                    {advices.map((advice, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => setSelectedTopic(advice)} 
                            style={[styles.topicBtn, selectedTopic === advice && {backgroundColor: '#a50f31', borderWidth: 5}]}
                            >
                            <Text style={styles.topicBtnText}>{advice.topic}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={[styles.btn, !selectedTopic && {backgroundColor: '#2e1212', opacity: 0.5}]} onPress={handleChooseTopic} disabled={!selectedTopic}>
                        <Text style={[styles.btnText, !selectedTopic &&  {color: '#000'}]}>Choose</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {topicChosen && !adviceChosen && (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={styles.title}>{topicChosen.topic}</Text>
                    <Animated.Image
                        source={require('../assets/randomizer.png')}
                        style={{
                            width: height * 0.29,
                            height: height * 0.29,
                            resizeMode: 'contain',
                            transform: [{ rotate: spin }],
                        }}
                    />
                    <Image
                        source={require('../assets/arrow.png')}
                        style={{
                            width: 42,
                            height: height * 0.07,
                            resizeMode: 'contain',
                            position: 'absolute',
                            bottom: 90,
                            alignSelf: 'center',
                        }}
                    />
                    <TouchableOpacity style={[styles.btn, { marginTop: 40 }]} onPress={handleSpin}>
                        <Text style={styles.btnText}>Spin</Text>
                    </TouchableOpacity>
                </View>
            )}

            {adviceChosen && (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={styles.title}>{topicChosen.topic}</Text>
                    <View style={{width: '80%', borderRadius: 22, backgroundColor: '#6cb2ff', alignItems: 'center', justifyContent: 'center', paddingVertical: 21, paddingHorizontal: 26, marginBottom: 20}}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', lineHeight: 22, marginBottom: 20}}>Bally decides:</Text>
                        <Text style={{ fontSize: 16, fontWeight: '300', color: '#000'}}>{adviceChosen}</Text>
                        <TouchableOpacity style={[styles.btn, { marginTop: 20, backgroundColor: '#a50f31', width: '100%' }]} onPress={shareAdvice}>
                            <Text style={[styles.btnText, {color: '#fff'}]}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.btn, { marginTop: 10 }]} onPress={handleSpin}>
                        <Text style={styles.btnText}>Spin one more time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { marginTop: 10 }]} onPress={resetSelection}>
                        <Text style={styles.btnText}>Back to Topics</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#a50f31',
    },

    upperContainer: {
        width: '100%',
        paddingTop: height * 0.07,
        paddingHorizontal: 27,
        paddingBottom: height * 0.04,
        backgroundColor: '#fdc300',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 32,
    },

    upperText: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 29.3,
        color: '#000',
        textAlign: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 29.3,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    
    btn: {
        width: 308,
        borderRadius: 18,
        backgroundColor: '#fdc300',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#2e1212',
    },

    topicBtn: {
        width: 308,
        padding: 17,
        borderRadius: 22,
        backgroundColor: '#f45277',
        borderWidth: 1,
        borderColor: '#fdc300',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    topicBtnText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
        textAlign: 'center'
    }

});

export default Advice;
