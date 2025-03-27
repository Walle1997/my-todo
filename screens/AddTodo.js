import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, Switch, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import * as Notifications from 'expo-notifications';

export default function AddTodo() {

    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    const [withAlert, setWithAlert] = React.useState(false);
    // const [listTodos, setListTodos] = React.useState([]);
    const listTodos = useSelector(state => state.todos.todos);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: isToday ? date.toISOString() : new Date(date).getTime() + 24 * 60 * 60 * 1000,
            isToday: isToday,
            isComplited: false
        };
        try {
            await AsyncStorage.setItem('Todos', JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            if(withAlert){
                await scheduleTodoNotification(newTodo);
            }
            navigation.goBack();
        }
        catch (e) {
            console.log(e);
        }
    };

    const scheduleTodoNotification = async (todo) => {
        const trigger = new Date(todo.hour);
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Внимание! Есть незакрытая задача.',
                    body: todo.text,
                },
                trigger,
            });
            console.log('Notification scheduled');
        } catch (e) {
            alert('The notification failed to schedule, make sure the hour is valid');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
            <Text style={styles.title}>Добавить задачу</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Имя</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Task"
                    placeholderTextColor="#00000030"
                    onChangeText={(text) => {setName(text)}} 
                /> 
            </View>        
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Время</Text>
                <DateTimePicker
                value={date}
                mode={'time'}
                is24Hour={true}
                onChange={(event, selectedDate) => setDate(selectedDate)}
                style={{width: '80%'}}
                />
            </View>
            <View style={[styles.inputContainer, {paddingBottom: 0, alignItems: 'center'}]}>
                <View>
                    <Text style={styles.inputTitle}>Сегодня</Text>
                    <Text style={{color: '#00000040', fontSize: 12, maxWidth: '84%', paddingBottom: 10}}>Если вы не выберете сегодня, то задача будет автоматически назначена на завтра.</Text>
                </View>
                <Switch
                    value={isToday}
                    onValueChange={(value) => { setIsToday(value) }}
                />
            </View>
            <View style={[styles.inputContainer, {paddingBottom: 0, alignItems: 'center'}]}>
                <View>
                    <Text style={styles.inputTitle}>Оповещение</Text>
                    <Text style={{color: '#00000040', fontSize: 12, maxWidth: '85%'}}>Вы получите оповещение в установленное вами время для этого напоминания.</Text>
                </View>
            <Switch
                    value={withAlert}
                    onValueChange={(value) => { setWithAlert(value) }}
                />
            </View>
            
            <TouchableOpacity onPress={addTodo} style={styles.button}>
                <Text style={{color: 'white'}}>Добавить задачу</Text>
            </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24
    },
    inputContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    }
});