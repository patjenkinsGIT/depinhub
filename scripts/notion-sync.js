// eslint-disable-next-line
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import matter from "gray-matter";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const guidesDir = path.join("src", "guides");

function mdToNotionBlocks(content) {
  const lines = content.split("\n");
  const blocks = [];

  for (const line of lines) {
    if (line.startsWith("### ")) {
      blocks.push({
        object: "block",
        type: "heading_3",
        heading_3: {
          rich_text: [{ type: "text", text: { content: line.slice(4) } }],
        },
      });
    } else if (line.startsWith("## ")) {
      blocks.push({
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: line.slice(3) } }],
        },
      });
    } else if (line.startsWith("# ")) {
      blocks.push({
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [{ type: "text", text: { content: line.slice(2) } }],
        },
      });
    } else if (line.trim().startsWith("```")) {
      // Skip code blocks for now (TODO: Add code block support)
      continue;
    } else if (line.trim()) {
      blocks.push({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: line } }],
        },
      });
    }
  }

  return blocks;
}

async function guideExists(title) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Name",
      title: {
        equals: title,
      },
    },
  });

  return response.results.length > 0;
}

async function syncGuides() {
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));
  let success = 0,
    skipped = 0,
    failed = 0;

  for (const file of files) {
    const filePath = path.join(guidesDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);

    const title = data.title || file.replace(/\.mdx$/, "").replace(/-/g, " ");

    try {
      const exists = await guideExists(title);
      if (exists) {
        console.log(`⚠️ Skipping duplicate: "${title}"`);
        skipped++;
        continue;
      }

      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [{ text: { content: title } }],
          },
        },
        children: mdToNotionBlocks(content),
      });

      console.log(`✅ Synced "${title}"`);
      success++;
    } catch (err) {
      console.error(`❌ Failed to sync "${title}": ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\n📊 Summary: ${success} synced, ${skipped} skipped, ${failed} failed.`
  );
}

syncGuides();
