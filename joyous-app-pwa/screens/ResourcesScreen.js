// screens/ResourcesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function ResourcesScreen() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // TODO: 자료실 API 호출
    setFiles([
      { id:'1', name:'소개문서.pdf' },
      { id:'2', name:'사용자가이드.docx' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={i=>i.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16,backgroundColor:'#FFFFFF'},
  item:{padding:12,borderBottomWidth:1,borderColor:'#E0E0E0',fontSize:16}
});
