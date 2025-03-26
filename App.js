import { SafeAreaView, StyleSheet } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <SafeAreaView>
      <TodoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
