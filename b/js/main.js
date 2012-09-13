/* Carmen Johnson
   MiU Project 3
   9/13/2012
*/

var items;
var pageScroll;
var page;
var pageLength;

$('#homePage').on('pageinit', 
function()
{
	$("#editItemPage").page();
	items = JSON.parse(jsonObject);

	pageScroll = window.pageYOffset;
	
	// Keep track of the current 'page' in the items
	page = 0;
	pageLength = 9;
	
	// Keep track of the row heights
	var rowHeight = 0;
	
	// Make sure we don't have any empty items
	items = jQuery.grep(items, function(n) { return n; });
	
			
	initializeList();
	
	// Show an item
	$("#itemList").on("click", ".item-link", function(e) {
		if($(this).children("img").css("display") !== "none") {
			$(this).children("img").css('display', 'none');
			$(this).children(".info-container").css("display", "block");
			
			$(this).css("height", "auto");
			if($(this).height() > rowHeight) {
				rowHeight = $(this).height();
			}
			
			$(".item-link").css("height", rowHeight);
		}
		else {
			$(this).children("img").css('display', 'inline');
			$(this).children(".info-container").css("display", "none");
			
			if($("#itemList img:visible").length == $("#itemList img").length) {
				$(".item-link").css("height", "auto");
				rowHeight = 0;
			}
		}
	});
	
	// Go to the previous page
	$("#prevPage").click(function() {
		if(page > 0) {
			page--;
			initializeList();
		}
	});
	
	// Go to the next page
	$("#nextPage").click(function() {
		if((page + 1) * pageLength < items.length) {
			page++;
			initializeList();
		}
	});
	
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
				
 		    },
			invalidHandler: function(form, validator) {
				var errors = validator.numberOfInvalids();
				var errs = "<div class='ui-bar-c'>Errors</div>";
				  for (var i=0;i<validator.errorList.length;i++){
					errs += validator.errorList[i].message + "<br />";
				}
				
				errs += '<a href="#" onclick="javascript:$(this).parent().hide()"data-role="button" class="ui-btn ui-shadow ui-btn-inline ui-btn-up-c" style="padding:3px;">Hide This</a>';
				$("#addItemPage .errMessage").html(errs);
				
				$("#addItemPage .errMessage").show();
			},
			submitHandler: function() {
			var data = myForm.serializeArray();
			var idno = storeData(data);
			page = 0;
			initializeList();
			clearAddFields();
			$.mobile.changePage("#homePage");
		}
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
				
 		    },
	
			invalidHandler: function(form, validator) {
					var errors = validator.numberOfInvalids();
					var errs = "<div class='ui-bar-c'>Errors</div>";
					  for (var i=0;i<validator.errorList.length;i++){
						errs += validator.errorList[i].message + "<br />";
					}
					
					errs += '<a href="#" onclick="javascript:$(this).parent().hide()"data-role="button" class="ui-btn ui-shadow ui-btn-inline ui-btn-up-c" style="padding:3px;">Hide This</a>';
					$("#editItemPage .errMessage").html(errs);
					
					$("#editItemPage .errMessage").show();
			},
			submitHandler: function() {
			var data = myForm.serializeArray();
			updateData(data);
			initializeList();
			$.mobile.changePage("#homePage");
		}
	});
	
});


var initializeList = function initializeList() {
		// Enable/disable the previous button
		if(page > 0) {
			$("#prevPage").removeClass("ui-disabled");
		}
		else {
			$("#prevPage").addClass("ui-disabled");
		}
		// Enable/disable the next button
		if(items.length - (page * pageLength) > pageLength) {
			$("#nextPage").removeClass("ui-disabled");
		}
		else {
			$("#nextPage").addClass("ui-disabled");
		}
		
		// Sort the items by date to do a News Stream
		items.sort(function(a, b) {
			if(b == null)
				return -1;
			else if(a == null)
				return 1;
			
			a = a.date.split("-");
			b = b.date.split("-");
			var aDate = new Date(a[2], a[1], a[0], 0, 0, 0, 0);
			var bDate = new Date(b[2], b[1], b[0], 0, 0, 0, 0);
			
			if(aDate > bDate)
				return -1;
			else if(bDate > aDate)
				return 1;
			else
				return 0;
		});
		
		// Add the items to the list
		$("#itemList").empty();
		for(var i = page * pageLength; i < (page * pageLength) + pageLength; i++) {
			var item = items[i];
			if(item == null)
				continue;
			
			var link = document.createElement("a");
			link.name = item.idno;
			link.setAttribute("class", "item-link");
			var listItem = document.createElement("li");
			listItem.setAttribute("data-filtertext", item.name + " " + item.category);
			var image = document.createElement("img");
			image.src = "images/" + item.category + ".png";
			
			var infoContainer = document.createElement("div");
			infoContainer.setAttribute("class", "info-container");
			var infoList = document.createElement("ul");
			
			
			var delButton = document.createElement("a");
			delButton.href = "javascript:deleteItem(this," + item.idno + ")";
			
			$(delButton).buttonMarkup({ icon: "delete",
										theme: "b",
										inline: true,
										mini: true,
										iconpos: "notext"
										});
										
			var editButton = document.createElement("a");
			editButton.href = "#editItemPage";
			editButton.setAttribute("onclick", "populateEditFields(" + item.idno + ");");
			editButton.setAttribute("name", item.idno);
			
			$(editButton).buttonMarkup({ icon: "gear",
										theme: "b",
										inline: true,
										mini: true,
										iconpos: "notext"
										});
			
										
			
			var btns = document.createElement("li");
			
			btns.appendChild(delButton);
			btns.appendChild(editButton);
			infoList.appendChild(btns);
			
			var category = document.createElement("li");
			category.innerHTML = "<label>Category:</label><p>" + makeTitleCase(item.category) + "</p>";
			infoList.appendChild(category);
			
			var name = document.createElement("li");
			name.innerHTML = "<label>Name:</label><p>" + item.name + "</p>";
			infoList.appendChild(name);
			
			var quantity = document.createElement("li");
			quantity.innerHTML = "<label>Quantity:</label><p>" + item.quantity + "</p>";
			infoList.appendChild(quantity);
			
			var date = document.createElement("li");
			date.innerHTML = "<label>Date:</label><p>" + item.date + "</p>";
			infoList.appendChild(date);
			
			var comments = document.createElement("li");
			comments.innerHTML = "<label>Comments:</label><p>" + item.comments + "</p>";
			infoList.appendChild(comments);
			
			
			if(item.important) {
				var important = document.createElement("li");
				important.innerHTML = "Important";
				infoList.appendChild(important);
			}

						
			infoContainer.appendChild(infoList);
			link.appendChild(image);
			link.appendChild(infoContainer);
			
			listItem.appendChild(link);
			
			$("#itemList").append(listItem);
		}
		$("#itemList").listview('refresh');
	}



	
var populateEditFields = function populateEditFields(idno)
{	
		var itemIndex = getItemIndex(idno);
		var item = items[itemIndex];
		
		$("#editItemPage [name='category']").val(item.category);
		
		$("#editItemPage [name='itemName']").val(item.name);
		$("#editItemPage [name='quantity']").val(item.quantity);
		$("#editItemPage [name='itemDate']").val(item.date);
		$("#editItemPage [name='comments']").val(item.comments);
		$("#editItemPage [name='important']").prop("checked", item.important);
		
		$("#editItemPage #update").attr("name", item.idno);
			
		$("#editItemPage [name='quantity']").slider('refresh');
		$("#editItemPage [name='important']").checkboxradio('refresh');
		$("#editItemPage [name='itemId']").val(item.idno);
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
	
var deleteItem = function deleteItem(idno)
	{
		var index = getItemIndex(idno);
		items.splice(index,1);
		initializeList();
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
	
//***********************************************

//***********************************