// const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY')

function listFiles () {
  const files = DriveApp.getFilesByType('application/pdf')
  Logger.log(files.next().getName())
}
