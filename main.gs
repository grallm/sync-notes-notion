import { Client } from "@notionhq/client"

const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');

// Initializing a Notion client
const notion = new Client({
  auth: notionApiKey
})
