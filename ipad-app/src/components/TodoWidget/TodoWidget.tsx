import { useEffect, useState } from "react";
import { trpc } from "../../lib/trpc";

type Todos = Awaited<ReturnType<typeof trpc.getTodos.query>>;

export const TodoWidget = () => {
  const [todos, setTodos] = useState<Todos>([]);
  useEffect(() => {
    const getTodos = async () => {
      const response = await trpc.getTodos.query();
      setTodos(response);
    };
    getTodos();
  }, []);
};
