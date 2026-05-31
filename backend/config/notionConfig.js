import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const notionDatabases = {
  waste: process.env.NOTION_DATABASE_ID_WASTE,
  biosecurity: process.env.NOTION_DATABASE_ID_BIOSECURITY,
  inactivation: process.env.NOTION_DATABASE_ID_INACTIVATION,
  alerts: process.env.NOTION_DATABASE_ID_ALERTS,
  maintenance: process.env.NOTION_DATABASE_ID_MAINTENANCE
};

export default notion;
