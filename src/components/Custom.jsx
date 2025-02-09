import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ScrollView, Share } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Custom = () => {
    const [headName, setHeadName] = useState('');
    const [tailName, setTailName] = useState('');
    const [edit, setEdit] = useState(true);
    const [result, setResult] = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [currentImage, setCurrentImage] = useState(require('../assets/head.png'));

    const handleFlip = () => {
        setEdit(false);
        setIsFlipping(true);
        setCurrentImage(require('../assets/logo-flip.png'));

        setTimeout(() => {
            const isHead = Math.random() < 0.5;
            setCurrentImage(isHead ? require('../assets/head.png') : require('../assets/tail.png'));
            setResult(isHead ? headName : tailName);
            setIsFlipping(false);
        }, 2000);
    };

    const handleEdit = () => {
        setEdit(true);
        setHeadName('');
        setTailName('');
    };

    const copyToClipboard = () => {
        Clipboard.setString(result || '');
        alert('Result copied to clipboard!');
    };

    const shareResult = async () => {
        try {
            await Share.share({
                message: `The result of my BallyFlip is: ${result}`,
            });
        } catch (error) {
            console.error('Error sharing result:', error);
        }
    };    

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.upperText}>Custom BallyFlip mode</Text>
            </View>

            {edit ? (
                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Heads Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here..."
                            placeholderTextColor="#999"
                            value={headName}
                            onChangeText={setHeadName}
                        />
                    </View>

                    <Image source={require('../assets/head.png')} style={{ width: 170, height: 170, resizeMode: 'contain', marginVertical: 20 }} />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tails Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here..."
                            placeholderTextColor="#999"
                            value={tailName}
                            onChangeText={setTailName}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleFlip} disabled={isFlipping}>
                        <Text style={styles.btnText}>{isFlipping ? 'Flipping...' : 'Flip'}</Text>
                    </TouchableOpacity>

                    <View style={{height: 150}} />
                </ScrollView>
            ) : (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={styles.resultText}>{result === tailName ? 'Tails Win !' : 'Heads Win !'}</Text>
                    <Image source={currentImage} style={[ currentImage === require('../assets/logo-flip.png') ? { width: '120%', height: height * 0.5, resizeMode: 'contain', marginVertical: 20 } : { width: '100%', height: height * 0.3, resizeMode: 'contain', marginVertical: 20 }]} />
                    {
                        !isFlipping && (
                            <View style={{width: '100%', alignItems: 'center', marginTop: -50}}>
                                <TouchableOpacity 
                                    style={{width: 308, height: 74, alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, borderRadius: 22, backgroundColor: '#fff', flexDirection: 'row'}}
                                    onPress={copyToClipboard}
                                    >
                                    <View style={{paddingVertical: 13, paddingHorizontal: 22}}>
                                        <Text style={styles.shareText}>{result === tailName ? 'Tails:' : 'Heads:'}</Text>
                                        <Text style={styles.shareText}>{result}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={{width: 74, height: 74, borderRadius: 22, padding: 27, backgroundColor: '#fdc300'}}
                                        onPress={shareResult}
                                    >
                                        <Icons type={'share'} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                                    <Text style={styles.btnText}>Create new custom Bally Flip</Text>
                                </TouchableOpacity>    
                            </View>
                        )
                    }
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

    inputContainer: {
        width: 321,
        borderRadius: 22,
        backgroundColor: '#fff',
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    label: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#000',
        marginBottom: 5,
    },

    input: {
        width: '100%',
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.5,
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

    resultText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },

    shareText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        lineHeight: 22
    }

});

export default Custom;