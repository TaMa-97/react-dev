/**
 * @component
 * TodoList：ToDoリストを表示・管理する
 */
import React, { useState } from "react";
import TodoForm from "./TodoForm";

// 型定義
interface Todo {
  text: string;
  isCompleted?: boolean; //タスクが完了したかどうかを表すフラグとして使う ※省略可能を明示する
}

// TodoListコンポーネント,値は渡す必要なし
const TodoList: React.FC = () => {
  // todosでstateを定義、初期値は空の配列
  const [todos, setTodos] = useState<Todo[]>([]); // Todo インターフェースの型に従った空の todos 配列を作成

  // タスクを追加する関数
  const addTodo = (text: string) => {
    // 引数として受け取ったテキストを新しいタスクとして扱う
    const newTodos = [...todos, { text }]; // 状態変数todos配列のすべてのタスクの末尾に、新しいタスクオブジェクト { text } を追加した新しい配列を作成
    setTodos(newTodos); //状態変数 todos を更新して再レンダリング
  };

  // タスクを削除する関数
  const deleteTodo = (index: number) => {
    // 引数: index - 削除するタスクの配列内のインデックス
    const newTodos = [...todos]; //現在のtodos配列を新しく作成
    newTodos.splice(index, 1); //指定されたインデックスのタスクを1つ削除
    setTodos(newTodos); // 状態変数todosを更新して再レンダリング
  };

  // タスクの完了状態を切り替える関数
  const completeTodo = (index: number) => {
    // 引数: index - 完了するタスクの配列内のインデックス
    const newTodos = [...todos]; //現在のtodos配列を新しく作成 ※新しい配列を作成する理由は、Reactが状態の変更を検知するため
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // クリックしたタスクの isCompleted を反転させる ※タスクの取り消し線を追加するため
    setTodos(newTodos); // 状態変数todosを更新して再レンダリング
  };

  return (
    <div className="myTodo">
      <h1 className="myTodo__ttl">ToDoリスト</h1>
      {/* 親コンポーネントに渡すためのコールバック関数addTodo */}
      <TodoForm addTodo={addTodo} />
      <ul className="myTodo__list">
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            className="myTodo__item"
          >
            {todo.text}
            <button onClick={() => completeTodo(index)}>タスク完了</button>
            <button onClick={() => deleteTodo(index)}>タスク削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
