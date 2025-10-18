import { Block } from "../../types";
import { publicProcedure } from "../../trpc";

import { Client } from "@notionhq/client";
import { ENV } from "../../env";

const notion = new Client({ auth: ENV.NOTION_API_KEY });

const PAGE_ID = "6add570adf6f4f068c8f011bd920ecc8";

export const getShoppingList = publicProcedure.query(async () => {
  const response = await notion.blocks.children.list({
    block_id: PAGE_ID,
    page_size: 50,
  });

  const content = response.results as unknown as Block[];
  const todoBlocks: Block<"to_do", { checked: boolean }>[] = content.filter(
    (block: Block) => block.type === "to_do",
  );

  const shoppingList = todoBlocks.map((block) => ({
    text: block.to_do.rich_text.map((text) => text.plain_text).join(" "),
    checked: block.to_do.checked,
  }));

  return shoppingList;
});
