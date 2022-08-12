import { NotionDB } from './types'

const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY')

// Folder containing all PDF notes
const noteFolderId = '1ic5zK6EdXOtbuvw-JDsfg2gnOyB7Uy5_'

// Notion page containing all note pages
const notionPageId = 'a1e8d191-a6af-46da-8d3d-c055cfa269aa'

// eslint-disable-next-line no-unused-vars
function listFiles () {
  // All notion pages
  const getPageOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      Authorization: `Bearer ${notionApiKey}`
    },
    muteHttpExceptions: true,
    payload: JSON.stringify({})
  }
  const notionPagesDbRes = UrlFetchApp.fetch(`https://api.notion.com/v1/databases/${notionPageId}/query`, getPageOptions)
  const notionPagesDb = JSON.parse(notionPagesDbRes.getContentText()) as NotionDB

  // Drive files
  const files = DriveApp.getFolderById(noteFolderId).getFilesByType('application/pdf')

  while (files.hasNext()) {
    const file = files.next()
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

    const fileId = file.getId()
    const displayUrl = 'https://drive.google.com/uc?export=view&id=' + fileId

    Logger.log(file.getSharingAccess())
    Logger.log(displayUrl)
  }
}
