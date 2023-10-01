
chrome.tabs.onUpdated.addListener( function ( tabId, changeInfo, tab )
{
    console.log( tab );
    chrome.scripting.executeScript( {
        files: [ "content.js" ],
        target: {
            tabId: tabId
        }
    }, function ( results )
    {
        console.log( results );
    } );
} );