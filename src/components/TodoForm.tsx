/**
 * @component
 * TodoForm：入力欄と送信ボタンを持つフォームを表示して、フォームが送信されたら入力されたタスクを追加する
 */
import React, { useState, FormEvent } from "react";

// 型定義
interface TodoFormProps {
  addTodo: (text: string) => void;
}

// TodoFormコンポーネント
const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  // valueでstateを定義、初期値は空文字列
  const [value, setValue] = useState<string>("");

  // フォームが送信されたときに実行する
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //デフォルト動作キャンセル
    if (!value) return; //入力値が空の場合は処理を中断する
    addTodo(value); //入力された値を追加する（子コンポーネント）
    setValue(""); //入力値を空にリセットする
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value} //入力値はstateで管理
        onChange={(e) => setValue(e.target.value)} //入力値が変更されたら、setValue関数を呼び出してstateを更新する
        placeholder="新しいタスクを追加する"
      />
      <button type="submit">タスク追加</button>
    </form>
  );
};

export default TodoForm;
