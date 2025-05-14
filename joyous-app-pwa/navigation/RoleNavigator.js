import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen       from '../screens/HomeScreen';
import SearchScreen     from '../screens/SearchScreen';
import NoticesScreen    from '../screens/NoticesScreen';
import ResourcesScreen  from '../screens/ResourcesScreen';
import ContactScreen    from '../screens/ContactScreen';
import AdminPage        from '../screens/AdminPage';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function RoleNavigator({ role, onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#F0FDFA' },
        tabBarActiveTintColor: '#00A8E8',
        tabBarInactiveTintColor: '#555555',
      }}
    >
      <Tab.Screen
        name="대시보드"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          )
        }}
      >
        {props => <HomeScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen
        name="검색"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={24} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="공지"
        component={NoticesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="campaign" size={24} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="자료"
        component={ResourcesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="folder" size={24} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="문의"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat-bubble" size={24} color={color} />
          )
        }}
      />

      {/* 관리자 계정인 경우에만 관리자 탭을 추가 */}
      {role === 'admin' && (
        <Tab.Screen
          name="관리자"
          component={AdminPage}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="admin-panel-settings" size={24} color={color} />
            )
          }}
        />
      )}
    </Tab.Navigator>
  );
}

