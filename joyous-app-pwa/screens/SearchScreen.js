// screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, Modal, Button,
  ScrollView, StyleSheet,
} from 'react-native';

// data 폴더에 업로드한 최신 JSON 불러오기
import steelData from '../data/steelData.json';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setFiltered(steelData);
  }, []);

  const handleSearch = text => {
    setQuery(text);
    const q = text.trim().toLowerCase();
    setFiltered(
      q
        ? steelData.filter(item =>
            item.astm.toLowerCase().includes(q)
          )
        : steelData
    );
  };

  const openDetail = item => {
    setSelected(item);
    setModalVisible(true);
  };
  const closeDetail = () => {
    setModalVisible(false);
    setSelected(null);
  };

  // 1) 쉼표(,) 또는 세미콜론(;)로 나누고, 2) 첫 공백 앞까지가 원소, 나머지가 범위
  const parseComposition = compStr => {
    return compStr
      .split(/[,;]/)                 // 쉼표와 세미콜론 분리
      .map(p => p.trim())            // 공백 제거
      .filter(Boolean)               // 빈 문자열 제거
      .map(p => {
        const [element, ...rest] = p.split(' ');
        return { element, range: rest.join(' ') };
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>강종 검색</Text>
      <TextInput
        style={styles.input}
        placeholder="ASTM 규격 검색 (예: A36)"
        value={query}
        onChangeText={handleSearch}
        autoCorrect={false}
        autoCapitalize="characters"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item, i) => item.astm + i}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => openDetail(item)}
          >
            <Text style={styles.itemText}>{item.astm}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noData}>검색 결과가 없습니다.</Text>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeDetail}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          {selected && (
            <>
              <Text style={styles.detailTitle}>{selected.astm}</Text>

              <Text style={styles.detailLabel}>설명</Text>
              <Text style={styles.detailText}>{selected.description}</Text>

              <Text style={styles.detailLabel}>성분 (Composition)</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell, styles.cellHeader]}>
                    원소
                  </Text>
                  <Text style={[styles.tableCell, styles.cellHeader]}>
                    함량 범위
                  </Text>
                </View>

                {parseComposition(selected.composition).map((row, i) => (
                  <View
                    key={i}
                    style={[
                      styles.tableRow,
                      i % 2 === 0 && styles.tableRowOdd,
                    ]}
                  >
                    <Text style={styles.tableCell}>{row.element}</Text>
                    <Text style={styles.tableCell}>{row.range}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.detailLabel}>JIS</Text>
              <Text style={styles.detailText}>{selected.jis || '—'}</Text>

              <Text style={styles.detailLabel}>DIN</Text>
              <Text style={styles.detailText}>{selected.din || '—'}</Text>
            </>
          )}
          <View style={styles.modalButton}>
            <Button title="닫기" onPress={closeDetail} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16,
  },
  list: { paddingBottom: 24 },
  item: {
    backgroundColor: '#F0FDFA', borderRadius: 8,
    padding: 16, marginBottom: 8,
  },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  noData: { textAlign: 'center', color: '#888', marginTop: 32 },

  modalContent: { padding: 24, backgroundColor: '#fff' },
  detailTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  detailLabel: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  detailText: { fontSize: 14, color: '#333', marginTop: 4 },

  table: {
    borderWidth: 1, borderColor: '#ccc',
    marginTop: 8, marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row', alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#E0F7F4',
  },
  tableRowOdd: {
    backgroundColor: '#F5FFFE',
  },
  tableCell: {
    flex: 1, padding: 8, borderRightWidth:1, borderRightColor:'#ccc',
  },
  cellHeader: {
    fontWeight: '600', fontSize: 14,
  },

  modalButton: {
    marginTop: 24, alignSelf: 'center', width: '40%',
  },
});
