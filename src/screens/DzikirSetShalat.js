import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Baca istighfar 3x',
    latin: 'test',
  },
  {
    id: '2',
    title: 'Second Item',
    latin: 'test',
  },
  {
    id: '3',
    title: 'Third Item',
    latin: 'test',
  },
  {
    id: '4',
    title: 'fourth Item',
    latin: 'test',
  },
  {
    id: '5',
    title: 'five Item',
    latin: 'test',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  latin: {
    fontSize: 16,
  },
});

export default App;
