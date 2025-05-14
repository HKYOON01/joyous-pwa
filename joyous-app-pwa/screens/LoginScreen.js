// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' 또는 'register'

  // 로그인 폼
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 폼
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  // 승인된 계정 목록 (하드코딩)
  const approvedUsers = [
    { email: 'hkyoon@younginat.com', password: 'ATFatf3366!', role: 'admin' },
    { email: 'test@example.com',           password: 'pass1234',   role: 'admin' },
    { email: 'user@example.com',           password: 'userpass',   role: 'user'  },
  ];

  const handleLogin = () => {
    const user = approvedUsers.find(
      u => u.email === email && u.password === password
    );
    if (user) {
      onLogin(user.email, user.role);
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleRegister = () => {
    if (!company || !name || !phone || !regEmail) {
      Alert.alert('입력 오류', '모든 정보를 입력해주세요.');
      return;
    }
    Alert.alert('회원가입', '관리자 승인 후 이용 가능합니다.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 모드 전환 탭 */}
        <View style={styles.tabBar}>
          <Pressable
            style={[styles.tab, mode === 'login' && styles.tabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
              로그인
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, mode === 'register' && styles.tabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
              회원가입
            </Text>
          </Pressable>
        </View>

        {/* 입력 폼 */}
        <View style={styles.form}>
          {mode === 'login' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="업체명"
                value={company}
                onChangeText={setCompany}
              />
              <TextInput
                style={styles.input}
                placeholder="성명"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="연락처"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="메일주소"
                value={regEmail}
                onChangeText={setRegEmail}
                keyboardType="email-address"
              />
            </>
          )}
        </View>

        {/* 제출 버튼 */}
        <Pressable
          style={styles.button}
          onPress={mode === 'login' ? handleLogin : handleRegister}
        >
          <Text style={styles.buttonText}>
            {mode === 'login' ? '로그인' : '전송'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
  },
  tabActive: {
    borderBottomColor: '#00A8E8',
  },
  tabText: {
    fontSize: 16,
    color: '#777777',
  },
  tabTextActive: {
    color: '#00A8E8',
    fontWeight: '600',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00A8E8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
