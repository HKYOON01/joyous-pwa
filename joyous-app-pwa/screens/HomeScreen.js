// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 24 * 2 - 16) / 2;  // 좌우 패딩 24 + 카드간격 16

export default function HomeScreen({ navigation, role, onLogout }) {
  const cards = [
    { label: '강종 검색', icon: 'search',      screen: '검색' },
    { label: '공지사항', icon: 'campaign',    screen: '공지' },
    { label: '자료실',   icon: 'folder',      screen: '자료' },
    { label: '문의하기', icon: 'chat-bubble', screen: '문의' },
  ];

  return (
    <View style={styles.safe}>
      {/* 로그아웃 버튼 */}
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </Pressable>

      {/* 카드 그리드 */}
      <View style={styles.grid}>
        {cards.map(c => (
          <Pressable
            key={c.label}
            style={styles.card}
            onPress={()=> navigation.navigate(c.screen)}
          >
            <MaterialIcons
              name={c.icon}
              size={32}
              color="#007C8C"
            />
            <Text style={styles.cardText}>{c.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 관리자 전용 버튼 */}
      {role === 'admin' && (
        <Pressable
          style={styles.adminButton}
          onPress={()=> navigation.navigate('AdminPage')}
        >
          <Text style={styles.adminText}>관리자 페이지로</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: 'flex-start',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#00A8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#F0FCFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    color: '#007C8C',
    fontWeight: '500',
  },
  adminButton: {
    marginTop: 'auto',
    marginBottom: 24,
    backgroundColor: '#00A8E8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  adminText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
