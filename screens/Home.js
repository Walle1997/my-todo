import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from "../data/todos";
import { useNavigation } from "@react-navigation/native";


export default function Home() {
    const [localdata, setLocalData] = React.useState(
        todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
    );
    const [isHidden, setIsHidden] = React.useState(false);
    const navigation = useNavigation();

    const handleHidePress = () => {
        if (isHidden) {
            setIsHidden(false);
            setLocalData(todosData.sort((a, b) => {return a.isCompleted - b.isCompleted}));
            return;
        }
        setIsHidden(!isHidden);
        setLocalData(localdata.filter(todo => !todo.isCompleted));
    }

  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/Liana.jpg')}
        style={styles.pic}
    />
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Сегодня</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={{color: '#3478f6'}}>{isHidden ? 'Показать завершенные' : 'Скрыть завершенные'}</Text>
        </TouchableOpacity>
    </View>

    <TodoList todosData={localdata.filter(todo => todo.isToday)} />

    <Text style={styles.title}>Завтра</Text>
    <TodoList todosData={todosData.filter(todo => !todo.isToday)} />

    <TouchableOpacity onPress={() => navigation.navigate("Добавить задачу")} style={styles.button}>
        <Text style={styles.plus}>+</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 70,
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop:10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 50,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: '#fff',
    position: 'absolute',
    top: -6,
    left: 9,
  }
});