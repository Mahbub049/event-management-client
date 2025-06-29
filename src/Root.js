import App from './App';
import AuthProvider from './context/AuthContext';

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
