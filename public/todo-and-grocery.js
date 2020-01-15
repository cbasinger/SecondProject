var api_url = 'http://localhost:3000/';
var toDoContainer= document.getElementById("toDoContainer");
var groceryContainer = document.getElementById("groceryContainer");
var toDoList = document.getElementById("toDoList");
var groceryList = document.getElementById("groceryList");

var createSubmitButton = function (listType) {
    let submitDiv = document.createElement("div");
    submitDiv.className = "row";
    submitDiv.id = listType + " submitButtonDiv";
    let submitButtonColumn = document.createElement("div");
    submitButtonColumn.className = "col-sm-1";
    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.innerHTML = "Submit";

    if(listType == "ToDoList"){
        submitButton.id = "ToDoListSubmitButton"
    }
    else if(listType == "GroceryList"){
        submitButton.id = "GroceryListSubmitButton"
    }
    
    submitButtonColumn.appendChild(submitButton);
    submitDiv.appendChild(submitButtonColumn);
    
    let inputAreaColumn = document.createElement("div");
    inputAreaColumn.className = "col-sm-11";
    let inputArea = document.createElement("input");
    inputArea.type = "text";
    inputAreaColumn.appendChild(inputArea);
    submitDiv.appendChild(inputAreaColumn)

    if(listType == "ToDoList"){
        toDoList.appendChild(submitDiv);
    }
    else if(listType == "GroceryList"){
        groceryList.appendChild(submitDiv);
    }
}

var createListItem = function (item, listType) {
    let container = document.createElement("div");
    container.id = listType + "Element" + item.id;
    container.className = "row";
    let checkBoxColumn = document.createElement("div");
    checkBoxColumn.className = "col-sm-1";
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBoxColumn.appendChild(checkBox);
    container.appendChild(checkBoxColumn);
    
    let ItemColumn = document.createElement("div");
    ItemColumn.className = "col-sm-11";

    if (listType == "ToDoList"){
        let toDoItem = document.createElement("p");
        toDoItem.innerHTML = item.todoitem;
        ItemColumn.appendChild(toDoItem);
        container.appendChild(ItemColumn);
        toDoContainer.appendChild(container);
    }

    else if (listType == "GroceryList") {
        let groceryItem = document.createElement("p");
        groceryItem.innerHTML = item.groceryitem;
        ItemColumn.appendChild(groceryItem);
        container.appendChild(ItemColumn);
        groceryContainer.appendChild(container);
    }
}

var getToDoList = function () {
    axios.get(api_url + 'api/todos')
        .then(function(data) {
            let allToDos = data.data;
            for (i=0; i< allToDos.length; i++){
                createListItem(allToDos[i], "ToDoList");
            }
            createSubmitButton("ToDoList");

        })
        .catch(function(error) {
            console.log(error)
        });
}

var getGroceryList = function(){
    axios.get(api_url + 'api/grocery')
        .then(function(data) {
            let allGroceryList = data.data;
            for (i=0; i< allGroceryList.length; i++){
                createListItem(allGroceryList[i], "GroceryList");
            }
            createSubmitButton("GroceryList");
        })
        .catch(function(error) {
            console.log(error)
        });
}

getToDoList();
getGroceryList();