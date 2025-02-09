import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Home = () => {
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(require('../assets/head.png'));
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const storedHeads = await AsyncStorage.getItem('headCount');
        const storedTails = await AsyncStorage.getItem('tailCount');
        if (storedHeads !== null) setHeadCount(parseInt(storedHeads));
        if (storedTails !== null) setTailCount(parseInt(storedTails));
      } catch (e) {
        console.error('Failed to load counts', e);
      }
    };
    loadCounts();
  }, []);

  const saveCounts = async (heads, tails) => {
    try {
      await AsyncStorage.setItem('headCount', heads.toString());
      await AsyncStorage.setItem('tailCount', tails.toString());
    } catch (e) {
      console.error('Failed to save counts', e);
    }
  };

  const handleFlip = () => {
    setIsFlipping(true);
    setCurrentImage(require('../assets/logo-flip.png'));

    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const newImage = isHeads
        ? require('../assets/head.png')
        : require('../assets/tail.png');

      setCurrentImage(newImage);
      setIsFlipping(false);

      const result = isHeads ? 'Head!' : 'Tail!';
      setLastResult(result);

      if (isHeads) {
        const newHeadCount = headCount + 1;
        setHeadCount(newHeadCount);
        saveCounts(newHeadCount, tailCount);
      } else {
        const newTailCount = tailCount + 1;
        setTailCount(newTailCount);
        saveCounts(headCount, newTailCount);
      }
    }, 2000);
  };

  const shareResult = async () => {
    try {
      await Share.share({
        message: `🎲 Bally Flip Result: ${lastResult}! 🎉`,
      });
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(lastResult || '');
    alert('Result copied to clipboard!');
};

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.upperText}>🎲 Make Decisions Fun and Effortless with Bally Flip! 🎉</Text>
      </View>

      <View style={styles.statRow}>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>Heads: {headCount}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>Tails: {tailCount}</Text>
        </View>
      </View>

      <Image source={currentImage} style={styles.image} />

      {
        lastResult && !isFlipping && (
          <TouchableOpacity 
              style={{width: 235, height: 74, alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: -60, borderRadius: 22, backgroundColor: '#fff', flexDirection: 'row'}}
              onPress={copyToClipboard}
              >
              <Text style={styles.shareText}>{lastResult}</Text>
              <TouchableOpacity 
                  style={{width: 74, height: 74, padding: 22}}
                  onPress={shareResult}
              >
                  <Icons type={'share'} />
              </TouchableOpacity>
          </TouchableOpacity>
        )
      }

      <TouchableOpacity style={styles.btn} onPress={handleFlip} disabled={isFlipping}>
        <Text style={styles.btnText}>{isFlipping ? 'Flipping...' : 'Flip'}</Text>
      </TouchableOpacity>
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

  statRow: {
    width: '100%',
    paddingHorizontal: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statContainer: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '45%',
    backgroundColor: '#f45277',
  },

  statText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#fff',
  },

  image: {
    width: '100%',
    height: height * 0.3,
    resizeMode: 'contain',
    marginVertical: 20,
  },

  btn: {
    width: '85%',
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

  shareText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
    marginLeft: 22
  }

});

export default Home;
