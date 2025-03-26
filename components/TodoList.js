import * as React from "react";
import { todosData } from "../data/todos";
import { FlatList, Text, View } from "react-native";
import Todo from "./Todo";

export default function TodoList() {
  return (
    <FlatList
      data={todosData}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <Todo {...item} />}
    />
  );
}