import { View } from 'react-native';
import styles from '../styles/signup';

export default function PageDots() {
  return (
    <View style={styles.dots}>
      <View style={[styles.dot, styles.dotActive]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
}
