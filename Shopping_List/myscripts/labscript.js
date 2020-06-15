//List variables
var listName;
var listNum = 1;
var listID = [];
var saveListName = [];
var duplicateCounter  = 0;
var addNewList;
var deleteList;
var getListID;

//Item variables
var itemName;
var itemNum = 1;
var itemID = [];
var saveItemName = [];
var addNewItem;
var deleteItem;
var getItemID;

var spanID;
var textFID;

var saveLists = [];
var saveItems = [];

var saveDIV = [];
var getListIDNum;
var itemClass;

//--------------------------------------------------------------------------//

//localStorage LISTS and Items
$(document).on('click', '#Save', function()
{	
	window.localStorage.clear();
	window.localStorage.saveLists = JSON.stringify(saveLists);
	window.localStorage.saveItems = JSON.stringify(saveItems);
});

$(document).on('click', '#Load', function()
{	
	saveLists = JSON.parse(window.localStorage.saveLists);
	
	for(var i = 0; i < 10000; i++)
	{
		if(saveLists[i] != null)
		{
			listNum++;
			$("#Lists").append(saveLists[i]);
		}
	}
	$("#Lists").collapsibleset().trigger('create');
	
	
	
	saveItems = JSON.parse(window.localStorage.saveItems);
	var listSpanID;
	var itemLabelClass;
	var getItemID1;
	var getItemID2;	
	
	for(var i = 0; i < 10000; i++)
	{
		if(saveItems[i] != null)
		{
			itemNum++;
		}
	}

	for(var i = 0; i < 10000; i++)
	{	
		if(saveLists[i] != null)
		{
			var list = $('#list'+i).map(function(index) 
			{
    			listSpanID = $(this).find("#subList"+i).attr('id');
    			getItemID1 = $(this).find("#item"+i).attr('id');
			});

			for(var j = 0; j < 10000; j++)
			{	
				if(saveItems[j] != null)
				{
					var test = saveItems[j];
					object = $('<fieldset/>').html(test).contents();
					itemLabelClass = object.find('label').attr('class');
					getItemID2 = object.find('label').attr('id');
					
					if(itemLabelClass == listSpanID && getItemID2 != getItemID1)
					{
						$("#"+listSpanID).append(saveItems[j]);
					}
				}
			}	
		}
	}
	$("#Lists").collapsibleset().trigger('create');
});

//--------------------------------------------------------------------------//
//Add List

$(document).on('click', '#AddList', function()
{	
	checkListNames();
});

function checkListNames()
{	
	//Get User Input for List Name
	listName = $('#AddNewListTextField').val();
	
	if(listName != "")
	{
		for(var i in saveListName)
		{
			if(saveListName[i] == listName)
			{
				duplicateCounter++;
				break;
			}
		}
		if(duplicateCounter > 1)
		{
			duplicateCounter = 0;
			alert("This name is already in use, enter a different name");
		}
		else if(duplicateCounter != 1)
		{
			duplicateCounter = 0;
			addListFunction();
		}
	}
	else
	{
		alert("You have not entered the name");
	}
}

function addListFunction()
{	

	saveListName.push(listName);
	listID.push("listID"+listNum);
	
	addNewList = '<div name="'+listName+'" id="list'+listNum+'" class="ListHolder" data-role="collapsible"';
	addNewList += ' data-inset="true" data-mini="true"';
	addNewList += ' data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d"';
	addNewList += ' data-iconpos="left" data-content-theme="a" data-collapsed="true">';
	addNewList += '<h3>'+listName+'</h3>';
	addNewList += '<h3 onclick="getListIDFunction(this)" id="list'+listNum+'" name="'+listNum+'"><input type="button" data-theme="a" data-icon="minus" data-role="button" value="Delete List"/></h3>';
	
	//Insert an Item
	addNewList += '<span class="subList" id="subList'+listNum+'"></span>';
	addNewList += '<label id="'+listNum+'" for="AddNewItemTextField">Enter item Name to ADD. To DELETE an item simply double click on it.</label>';
	addNewList += '<input onclick="getTextFID(this)" id="AddNewItemTextField'+listNum+'" type="text" value="" data-mini="true" name="subList'+listNum+'">';
	addNewList += '<input id="AddItem" type="button" value="Add Item" data-mini="true">';
	addNewList += '</div>';
	
	saveLists[listNum] = addNewList;
	listNum++;
	
	$("#Lists").append(addNewList);
	$("#Lists").collapsibleset().trigger('create');
	
}

//Delete List
//----------------------------------------------------------------------------//

//Get List ID
function getListIDFunction(theLink)
{
	getListID = theLink.id;
	var deleteListName = $("#"+getListID).attr('name'); 

	for(var i = 0; i < 10000; i++)
	{
		if(("list" + i) == getListID)
		{
			getListIDNum = i;
			break;
		}
	}
	saveListName.splice($.inArray(deleteListName, saveListName), 1);
	saveLists[getListIDNum] = "";
	
	deleteListFunction();
}

function deleteListFunction()
{	
	$('#'+getListID).remove();
	$("#Lists").collapsibleset().trigger('create');
}

//Items
//----------------------------------------------------------------------------//
//Add Item

//Get Text Field ID
function getTextFID(getID)
{
	textFID = getID.id;
	spanID = getID.name;
}

$(document).on('click', '#AddItem', function()
{ 
	checkItemNames();
});

function checkItemNames()
{	
	//Get User Input for List Name
	itemName = $('#'+textFID).val();
	
	if(itemName != "")
	{
		addItemFunction();
	}
	else
	{
		alert("You have not entered the name");
	}
}

function addItemFunction()
{	
	saveItemName.push(itemName);
	itemID.push("itemID"+itemNum);

	addNewItem = '<fieldset class="'+spanID+'" name="'+itemName+'" id="item'+itemNum+'"';
	addNewItem += 'ondblclick="getItemIDFunction(this)">';
	addNewItem += '<label ondblclick="getItemIDFunction(this)" class="'+spanID+'" name="'+itemName+'" id="item'+itemNum+'" for="select-based-flipswitch">'+itemName+'</label>';
	addNewItem += '<div name="'+itemName+'" id="item'+itemNum+'" data-role="fieldcontain">';
	addNewItem += '<select name="'+itemName+'" id="item'+itemNum+'" data-role="flipswitch">';
	addNewItem += '<option name="'+itemName+'" id="item'+itemNum+'" value="leave">Coml</option>';
	addNewItem += '<option name="'+itemName+'" id="item'+itemNum+'" value="arrive">Cart</option>';
	addNewItem += '</select>';
	addNewItem += '</div>';
	addNewItem += '</fieldset>';
	
	saveItems[itemNum] = addNewItem;
	itemNum++;
	
	$("#"+spanID).append(addNewItem);
	$("#"+textFID).val("");
	$("#"+spanID).collapsibleset().trigger('create');
}

//--------------------------------------------------------------------------//
//Delete Item

//Get Item ID
function getItemIDFunction(theLink)
{
	getItemID = theLink.id;
	var getFieldsetID = $("#"+getItemID).attr('id');
	
	for(var i = 0; i < 10000; i++)
	{
		if(("item" + i) == getFieldsetID)
		{
			itemClass = i;
//			break;
		}
	}
	saveItems[itemClass] = "";

	deleteItemFunction();
}

function deleteItemFunction()
{
	$('#'+getItemID).remove();
	$("#Lists").trigger('create');
}


