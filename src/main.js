// const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY')

function listFiles () {
  const files = DriveApp.getFilesByType('application/pdf')

  const file = files.next()
  // file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.EDIT)

  const fileId = file.getId()
  const displayUrl = 'https://drive.google.com/uc?export=view&id=' + fileId

  Logger.log(file.getSharingAccess())
  Logger.log(displayUrl)
}
