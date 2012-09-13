/* Carmen Johnson
   MiU Project 3
   9/13/2012
*/

var items;
var pageScroll;


$('#homePage').on('pageinit', 
function()
{
	items = JSON.parse(jsonObject);
	
	// Keep track of the page position
	pageScroll = window.pageYOffset;
	
	// Make sure we don't have any empty items
	items = jQuery.grep(items, function(n) { return n; });
	
	//Initialize and make item list
	initializeList();
	
	// Show an item
	$("#itemList").on("click", ".item-link", function(){viewItem($(this).attr("name"));});
	
	$(document).bind("pagechange", function(e, data) {
		// Only worry about the 'viewItem' page
		// Scroll to where the user was
		if(data.toPage[0] == $("#viewItem")[0]) {
			$.mobile.silentScroll(pageScroll);
		}
	});
	
});


$('#addItemPage').on('pageinit', 
function()
{
	var myForm = $('#addItemForm');
	myForm.validate({
	
			rules: {
					category: "required",
					itemName: "required",
					quantity: {required:true, digits: true},
					itemDate: {required:true, date:true},
					comments: "required"
				  },
			messages: {
						category: "Please select a category.",
						itemName: "Name is required",
						quantity: {required:"Quantity is required", digits:"Quantity must be numeric"},
						itemDate: {required:"Date is required", date:"Date must be in dd-mm-yyyy format"},
						comments: "Comment is required"
					},
			errorPlacement: function(error, element) {
				if(element.attr("id") == "category")
					error.insertAfter(element.parent().parent());
				else if(element.attr("id") == "itemDate")
					error.insertAfter(element.parent());
				else
					error.insertAfter(element);
 		    },
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
			var data = myForm.serializeArray();
			var idno = storeData(data);
			initializeList();
			showPopupMessage("Item added!!");
			viewItem(idno);
			$.mobile.changePage("#viewItemPage");
		}
	});
	
});


$('#viewItemPage').on('pageinit', 
function()
{
	$("#editItemPage").page();
	$("#editItemButton").click(function()
	{	
		var itemId = $(this).attr("name");
		var itemIndex = getItemIndex(itemId);
		var item = items[itemIndex];
		$("#editItemPage [name='category']").val(item.category);
		$("#editItemPage [name='itemName']").val(item.name);
		
		
		$("#editItemPage [name='quantity']").val(item.quantity).slider('refresh');
		
		$("#editItemPage [name='itemDate']").val(item.date);
		
		$("#editItemPage [name='comments']").val(item.comments);
		
		
		$("#editItemPage [name='important']").prop("checked", item.important).checkboxradio('refresh');
		
		$("#editItemPage #update").attr("name", item.idno);
		
		$("#editItemPage [name='itemId']").val(item.idno);
	});
});


$('#editItemPage').on('pageinit', 
function()
{

	var myForm = $('#editItemForm');
	myForm.validate({
	
			rules: {
					category: "required",
					itemName: "required",
					quantity: {required:true, digits: true},
					itemDate: {required:true, date:true},
					comments: "required"
				  },
			messages: {
						category: "Please select a category.",
						itemName: "Name is required",
						quantity: {required:"Quantity is required", digits:"Quantity must be numeric"},
						itemDate: {required:"Date is required", date:"Date must be in dd-mm-yyyy format"},
						comments: "Comment is required"
					},
			errorPlacement: function(error, element) {
				if(element.attr("id") == "category")
					error.insertAfter(element.parent().parent());
				else if(element.attr("id") == "itemDate")
					error.insertAfter(element.parent());
				else
					error.insertAfter(element);
 		    },
	
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
			var data = myForm.serializeArray();
			updateData(data);
			showPopupMessage("Item updated!!");
			viewItem(data[0].value);
			$.mobile.changePage("#viewItemPage");
		}
	});
	
});




var initializeList = function initializeList() {
		// Sort the items alphabetically
		items.sort(function(a, b) {
			if(b == null)
				return -1;
			else if(a == null)
				return 1;
			
			for(var i = 0; i < a.name.length && i < b.name.length; i++) {
				if(a.name[i].toUpperCase() < b.name[i].toUpperCase())
					return -1;
				else if(b.name[i].toUpperCase() < a.name[i].toUpperCase())
					return 1;
			}
			
			if(a.name.length < b.name.length)
				return -1;
			else if(b.name.length < a.name.length)
				return 1;
			else
				return 0;
		});
		
		// Add the items to the list
		$("#itemList").empty();
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			if(item == null)
				continue;
			
			var link = document.createElement("a");
			link.href = "#viewItemPage";
			link.name = item.idno;
			link.setAttribute("class", "item-link");
			var listItem = document.createElement("li");
			listItem.setAttribute("data-filtertext", item.name + " " + item.category);
			var image = document.createElement("img");
			image.src = "images/" + item.category + ".png";
			var text = document.createElement("h1");
			text.setAttribute("class", "item-text");
			text.innerHTML = item.name;
			
			var delIcon = document.createElement("a");
			delIcon.href = "javascript:deleteItem(" + item.idno + ")";
			delIcon.name = item.idno;
			delIcon.setAttribute("data-role", "button");
			delIcon.setAttribute("data-icon", "delete");
						
								
			link.appendChild(image);
			link.appendChild(text);
			listItem.appendChild(link);
			listItem.appendChild(delIcon);
					
					
			$("#itemList").append(listItem);
		}
		$("#itemList").listview('refresh');
	}

var storeData = function storeData(data)
				{
					if(data.length == 6)
					{
						var important = true;
						var comments = data[5].value;
					}
					else
					{
						var important = false;
						var comments = data[4].value;
					
					}
					
					var newID = getMaxId() + 1;
					items.push({
					category: data[0].value,
					name: data[1].value,
					quantity: data[2].value,
					idno: newID,
					date: data[3].value,
					comments: comments,
					important: important
					});
					
					return newID;
				};
				
				
var updateData = function updateData(data)
				{
					var importannt;
					var comments;
					
					if(data.length == 7)
					{
						important = true;
						comments = data[6].value;
					}
					else
					{
						important = false;
						comments = data[5].value;
					
					}
									
					var itemIndex = getItemIndex(data[0].value);
					var item = items[itemIndex];
					item.category= data[1].value,
					item.name= data[2].value,
					item.quantity= data[3].value,
					item.date= data[4].value,
					item.important= important,
					item.comments= comments
					}
			
var getData = function getData(idno)
{
	var index = getItemIndex(idno);
	return items[index];
}

			
var makeTitleCase = function(arg) {
		if (arg.length >= 1)
			return (arg.substr(0,1).toUpperCase() + arg.substr(1, arg.length));
		else return arg;
	};

	
var viewItem = function viewItem(idno) 
	{
	
		// Save the scroll position
		pageScroll = window.pageYOffset;
		
		// Get the item they clicked on
		var item = getData(idno);
				
		$("#itemView img").attr("src", "images/" + item.category + ".png");
		$("#itemView [name='category'] span").text(makeTitleCase(item.category));
		$("#itemView [name='name'] span").text(item.name);
		$("#itemView [name='quantity'] span").text(item.quantity);
		$("#itemView [name='date'] span").text(item.date);
		$("#itemView [name='comments'] span").text(item.comments);
		if(item.important) {
			$("#itemView [name='important']").css("display", "block");
			$("#itemView [name='comments']").removeClass('ui-corner-bottom ui-li-last');
		}
		else {
			$("#itemView [name='important']").css("display", "none");
			$("#itemView [name='comments']").addClass('ui-corner-bottom ui-li-last');
		}
		//*********
		$('#editItemButton').attr("name", item.idno);
		
	}

	
var deleteItem = function deleteItem(idno)
	{
		var res = confirm("Are you sure?");
		if(!res)
			return;
		var len = items.length;
		for(var i=0;i<len;i++)
		{
			if(items[i].idno == idno)
			{
				items.splice(i,1);
				break;
			}
		}
		$('[name="' + idno + '"]').parent("li").remove();
	}
	
var getItemIndex = function getItemIndex(idno)
	{
		var len = items.length;
		for(var i=0;i<len;i++)
		{
			if(items[i].idno == idno)
			{
				return i;
				break;
			}
		}
	}
	
var getMaxId = function getMaxId()
	{
		var maxId=items[0].idno;
		var len = items.length;
		for(i=1;i<len;i++)
		{
			if(items[i].idno > maxId)
				maxId = items[i].idno;
		}
		return maxId;
	}
	
	
var showPopupMessage = function showPopupMessage(msg)
{
    $("<div class='ui-overlay-shadow"+
    " ui-body-e ui-corner-all'>"+
    msg+    
    "</div>").
    css({ "display": "block",
        "margin-top":"25%",
		"margin-left":"10%",
		"margin-right":"10%",
		"padding":"10px",
        "postion":"fixed",
        "text-align":"center",
        "opacity": 0.96})
      .appendTo($("body") )
      .delay( 1500 )
      .fadeOut( 400, function(){
        $(this).remove();
      });
}


var clearAddFields = function clearAddFields()
{
	$('#addItemPage .errMessage').hide();
	$("#addItemPage [name='category']").val("");
	
	$("#addItemPage [name='itemName']").val("");
	$("#addItemPage [name='quantity']").val(1);
	var d = new Date();
	if(d.getMonth()<9)
		newM = "0" + (d.getMonth()+1);
	else
		newM = d.getMonth()+1;
	var strDate = d.getFullYear() + "-" +  newM + "-" + d.getDate();
	$("#addItemPage [name='itemDate']").val(strDate);
	$("#addItemPage [name='comments']").val("");;
	$("#addItemPage [name='important']").prop("checked", false);
	
	$("#addItemPage [name='quantity']").slider('refresh');
	$("#addItemPage [name='important']").checkboxradio('refresh');
}
	
	
