import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./index";

createHTTPServer({
  router: appRouter,
  createContext() {
    console.log("context 3");
    return {};
  },
  // basePath: '/trpc/', // optional, defaults to '/'
}).listen(2022);
