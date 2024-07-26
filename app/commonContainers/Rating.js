import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rate, count }) => {
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <View style={styles.container}>
      <Text style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Text key={`full_${i}`} style={styles.fullStar}>★</Text>
        ))}
        {halfStar ? <Text style={styles.halfStar}>★</Text> : null}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty_${i}`} style={styles.emptyStar}>★</Text>
        ))}
      </Text>
      <Text style={styles.count}>({count})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:5,
  },
  stars: {
    fontSize: 20,
  },
  fullStar: {
    color: 'gold',
  },
  halfStar: {
    color: 'gold',
    position: 'relative',
  },
  emptyStar: {
    color: '#D3D3D3',
  },
  count: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
});

export default Rating;