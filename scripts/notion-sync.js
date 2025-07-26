// eslint-disable-next-line
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import slugify from "slugify";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const guidesDir = path.join("src", "guides");
if (!fs.existsSync(guidesDir)) fs.mkdirSync(guidesDir, { recursive: true });

async function syncGuides() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    });

    for (const page of response.results) {
      const props = page.properties;

      const title = props.Title?.title?.[0]?.plain_text || "Untitled";
      const slug =
        props.Slug?.rich_text?.[0]?.plain_text ||
        slugify(title, { lower: true });
      const excerpt = props.Excerpt?.rich_text?.[0]?.plain_text || "";
      const category = props.Category?.rich_text?.[0]?.plain_text || "Misc";
      const difficulty =
        props.Difficulty?.rich_text?.[0]?.plain_text || "Unknown";
      const roi = props.ROI?.rich_text?.[0]?.plain_text || "";
      const logo = props.Logo?.url || "";
      const tags = props.Tags?.multi_select?.map((tag) => tag.name) || [];

      const fileName = `${slug}.mdx`;
      const filePath = path.join(guidesDir, fileName);

      const metadataBlock = `export const metadata = {
  title: ${JSON.stringify(title)},
  excerpt: ${JSON.stringify(excerpt)},
  slug: ${JSON.stringify(slug)},
  category: ${JSON.stringify(category)},
  difficulty: ${JSON.stringify(difficulty)},
  roi: ${JSON.stringify(roi)},
  logo: ${JSON.stringify(logo)},
  tags: [${tags.map((tag) => JSON.stringify(tag)).join(", ")}]
};`;

      const blocks = await notion.blocks.children.list({ block_id: page.id });
      const content = blocks.results
        .map((block) => {
          const text = (block[block.type]?.rich_text || [])
            .map((rt) => rt.text?.content || "")
            .join("");

          switch (block.type) {
            case "heading_1":
              return `# ${text}`;
            case "heading_2":
              return `## ${text}`;
            case "heading_3":
              return `### ${text}`;
            case "paragraph":
              return `${text}`;
            case "code":
              const lang = block.code.language || "plaintext";
              return `\`\`\`${lang}\n${text}\n\`\`\``;
            case "bulleted_list_item":
              return `- ${text}`;
            case "numbered_list_item":
              return `1. ${text}`;
            case "quote":
              return `> ${text}`;
            default:
              return "";
          }
        })
        .filter(Boolean)
        .join("\n\n");

      fs.writeFileSync(filePath, `${metadataBlock}\n\n${content}`);
      console.log(`✅ Synced: ${title} → ${fileName}`);
    }
  } catch (err) {
    console.error("❌ Error syncing guides:", err.message);
  }
}

syncGuides();
