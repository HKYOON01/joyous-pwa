import React, { useState }             from 'react';
import { NavigationContainer }         from '@react-navigation/native';
import { createNativeStackNavigator }  from '@react-navigation/native-stack';
import LoginScreen                     from './screens/LoginScreen';
import RoleNavigator                   from './navigation/RoleNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole,  setUserRole]  = useState(null);

  const handleLogin = (email, role) => {
    setUserEmail(email);
    // 관리자 이메일 매칭
    if (email === 'hkyoon@younginat.com') {
      setUserRole('admin');
    } else {
      setUserRole(role);
    }
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUserRole(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { !userEmail ? (
          // 로그인 전
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          // 로그인 후: 무조건 RoleNavigator
          <Stack.Screen name="Main">
            {props => (
              <RoleNavigator
                {...props}
                role={userRole}
                onLogout={handleLogout}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

