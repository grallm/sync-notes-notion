import * as NotionApiEndpoints from '@notionhq/client/build/src/api-endpoints'

const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY')

// Folder containing all PDF notes
const noteFolderId = '1ic5zK6EdXOtbuvw-JDsfg2gnOyB7Uy5_'

// Notion page containing all note pages
const notionPageId = 'a1e8d191-a6af-46da-8d3d-c055cfa269aa'

const notionHttpHeaders = {
  Accept: 'application/json',
  'Notion-Version': '2022-06-28',
  Authorization: `Bearer ${notionApiKey}`
}

/**
 * Retrieve the title and generated ID (not UUID) of a Notion page
 */
function getNotionPage (pageId: string) {
  const getPageOpt: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
    headers: notionHttpHeaders,
    muteHttpExceptions: true
  }

  // Retrieve the page to access ID property value
  const notionPageRes = UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, getPageOpt)
  const pageRes = JSON.parse(notionPageRes.getContentText()) as NotionApiEndpoints.PageObjectResponse
  const idPropId = pageRes.properties.ID.id

  const notionPageTitleRes = UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}/properties/title`, getPageOpt)
  const titleRes = JSON.parse(notionPageTitleRes.getContentText()) as NotionApiEndpoints.PropertyItemPropertyItemListResponse

  const notionPageIdRes = UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}/properties/${idPropId}`, getPageOpt)
  const idRes = JSON.parse(notionPageIdRes.getContentText()) as NotionApiEndpoints.FormulaPropertyItemObjectResponse

  Logger.log(titleRes)
  Logger.log(idRes)

  return {
    uuid: pageId,
    title: (titleRes.results[0] as NotionApiEndpoints.TitlePropertyItemObjectResponse).title.plain_text,
    id: (idRes.formula as { type: string; string: string }).string
  }
}

// eslint-disable-next-line no-unused-vars
function listFiles () {
  // All notion pages
  const queryDbOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: notionHttpHeaders,
    muteHttpExceptions: true,
    payload: JSON.stringify({})
  }

  const notionPagesDbRes = UrlFetchApp.fetch(`https://api.notion.com/v1/databases/${notionPageId}/query`, queryDbOptions)
  const notionPagesDb = JSON.parse(notionPagesDbRes.getContentText()) as NotionApiEndpoints.QueryDatabaseResponse

  if (notionPagesDb.results.length === 0) {
    return
  }

  Logger.log(getNotionPage(notionPagesDb.results[0].id))

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
