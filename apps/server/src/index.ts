import { getShoppingList } from "./routes/notion/get-shopping-list";
import { getTodos } from "./routes/notion/get-todos";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getShoppingList: getShoppingList,
  getTodos: getTodos,
});

// This type is used to infer the type of the router in the client
export type AppRouter = typeof appRouter;
