// const notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY')

const noteFolderId = '1ic5zK6EdXOtbuvw-JDsfg2gnOyB7Uy5_'

function listFiles () {
  const files = DriveApp.getFolderById(noteFolderId).getFilesByType('application/pdf')

  const file = files.next()
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

  const fileId = file.getId()
  const displayUrl = 'https://drive.google.com/uc?export=view&id=' + fileId

  Logger.log(file.getSharingAccess())
  Logger.log(displayUrl)
}
