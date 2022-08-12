"use strict";
exports.__esModule = true;
var notionApiKey = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');
// Folder containing all PDF notes
var noteFolderId = '1ic5zK6EdXOtbuvw-JDsfg2gnOyB7Uy5_';
// Notion page containing all note pages
var notionPageId = 'a1e8d191-a6af-46da-8d3d-c055cfa269aa';
// eslint-disable-next-line no-unused-vars
function listFiles() {
    // All notion pages
    var getPageOptions = {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            Authorization: "Bearer ".concat(notionApiKey)
        },
        muteHttpExceptions: true,
        payload: JSON.stringify({})
    };
    var notionPagesDbRes = UrlFetchApp.fetch("https://api.notion.com/v1/databases/".concat(notionPageId, "/query"), getPageOptions);
    var notionPagesDb = JSON.parse(notionPagesDbRes.getContentText());
    // Drive files
    var files = DriveApp.getFolderById(noteFolderId).getFilesByType('application/pdf');
    while (files.hasNext()) {
        var file = files.next();
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        var fileId = file.getId();
        var displayUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;
        Logger.log(file.getSharingAccess());
        Logger.log(displayUrl);
    }
}
