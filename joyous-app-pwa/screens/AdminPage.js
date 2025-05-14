// screens/AdminPage.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AdminPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>관리자 페이지</Text>

      {/* 여기에 관리자용 통계, 승인 대기 명단, 설정 등 원하는 컴포넌트 넣으시면 됩니다 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>• 회원 승인 대기</Text>
        <Text style={styles.placeholder}>(여기에 승인 대기 목록 표시)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>• 앱 통계</Text>
        <Text style={styles.placeholder}>(여기에 일별/월별 접속 통계 표시)</Text>
      </View>

      {/* ... 추가 섹션 ... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#007C8C',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00A8E8',
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: '#555555',
  },
});
