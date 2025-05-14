// screens/NoticesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function NoticesScreen() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // TODO: 공지사항 API 호출
    setNotices([
      { id:'1', title:'서버 점검 안내', date:'2025-05-10' },
      { id:'2', title:'신규 기능 업데이트', date:'2025-05-08' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        keyExtractor={i=>i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#FFFFFF'},
  row:{padding:16,borderBottomWidth:1,borderColor:'#E0E0E0'},
  title:{fontSize:16,color:'#007C8C'},
  date:{fontSize:12,color:'#808080',marginTop:4}
});
