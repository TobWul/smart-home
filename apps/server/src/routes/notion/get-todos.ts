import { Client } from "@notionhq/client";
import { publicProcedure } from "../../trpc";
import { ENV } from "../../env";

const notion = new Client({ auth: ENV.NOTION_API_KEY });

const DATA_SOURCE_ID = "bc028fd3-ec15-4f18-a70f-01aaa72655e7";

type Todo = {
  name: string;
  deadline: string | null;
  status: "Now" | "Next" | "Later";
};

export const getTodos = publicProcedure.query(async () => {
  console.log("Fetching todos from Notion...");
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      or: [
        {
          property: "Status",
          status: {
            equals: "Now",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Deadline",
        direction: "ascending",
      },
    ],
  });

  const todos: Todo[] = response.result.data.map((todo) => ({
    name: todo.properties.Name.title[0]?.plain_text || "Untitled",
    deadline: todo.properties.Deadline.date?.start || null,
    status: todo.properties.Status.status.name,
  }));

  return todos;
});
