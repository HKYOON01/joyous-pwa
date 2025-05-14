// screens/ContactScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function ContactScreen() {
  const [msg, setMsg] = useState('');

  const handleSubmit = () => {
    // TODO: 문의 전송 API 호출
    Alert.alert('문의가 전송되었습니다.', '감사합니다!');
    setMsg('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="문의 내용을 입력하세요"
        multiline
        numberOfLines={4}
        value={msg}
        onChangeText={setMsg}
        style={styles.input}
        placeholderTextColor="#808080"
      />
      <Button title="전송" color="#00A8E8" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16,backgroundColor:'#FFFFFF'},
  input:{
    borderWidth:1,
    borderColor:'#007C8C',
    borderRadius:8,
    padding:12,
    marginBottom:12,
    textAlignVertical:'top'
  }
});
