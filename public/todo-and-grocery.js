var api_url = 'http://localhost:3000/';
var toDoContainer= document.getElementById("toDoContainer");
var groceryContainer = document.getElementById("groceryContainer");
var toDoList = document.getElementById("toDoList");
var groceryList = document.getElementById("groceryList");
var toDoListLength = 0;
var groceryListLength = 0;

var createSubmitButton = function (listType) {
    let submitDiv = document.createElement("div");
    submitDiv.className = "row";
    submitDiv.id = listType + " submitButtonDiv";
    let submitButtonColumn = document.createElement("div");
    submitButtonColumn.className = "col-sm-1";
    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.innerHTML = "Submit";
    let inputAreaColumn = document.createElement("div");
    inputAreaColumn.className = "col-sm-11";
    let inputArea = document.createElement("input");
    inputArea.type = "text";
    

    if(listType == "ToDoList"){
        inputArea.id = "ToDoListInputArea";
        submitButton.id = "ToDoListSubmitButton";
    }
    else if(listType == "GroceryList"){
        inputArea.id = "GroceryListInputArea";
        submitButton.id = "GroceryListSubmitButton"
    }
    
    inputAreaColumn.appendChild(inputArea);
    submitButtonColumn.appendChild(submitButton);
    submitDiv.appendChild(submitButtonColumn);
    
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
    container.id = listType + "Element " + item.id;
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
        checkBox.id = "ToDocheckbox " + toDoListLength;
        toDoListLength ++;
        let toDoItem = document.createElement("p");
        toDoItem.innerHTML = item.todoitem;
        ItemColumn.appendChild(toDoItem);
        container.appendChild(ItemColumn);
        toDoContainer.appendChild(container);
    }

    else if (listType == "GroceryList") {
        checkBox.id = "Grocerycheckbox " + groceryListLength;
        groceryListLength ++;
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
            deleteFunction();
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
            deleteFunction();
        })
        .catch(function(error) {
            console.log(error)
        });
}

getToDoList();
getGroceryList();
createSubmitButton("ToDoList");
createSubmitButton("GroceryList");

var ToDoListSubmitButton = document.getElementById("ToDoListSubmitButton");
var ToDoListInputArea = document.getElementById("ToDoListInputArea");
var GroceryListSubmitButton = document.getElementById("GroceryListSubmitButton");
var GroceryListInputArea = document.getElementById("GroceryListInputArea");

ToDoListSubmitButton.onclick = function (){
    if (ToDoListInputArea.value !== null & ToDoListInputArea.value !== ""){
        let requestBody = {
            todoitem: ToDoListInputArea.value
        }
        axios.post(api_url + `api/todo`, requestBody)
        .then(function(result) {
            createListItem(result.data, "ToDoList");
            ToDoListInputArea.value = "";
        })
            
        .catch(function(error) {
            console.log(error)
            //Code for handling errors
         });
    }    
}

GroceryListSubmitButton.onclick = function (){
    if (GroceryListInputArea.value !== null & GroceryListInputArea.value !== ""){
        let requestBody = {
            groceryitem: GroceryListInputArea.value
        }
        axios.post(api_url + `api/grocery`, requestBody)
        .then(function(result) {
            createListItem(result.data, "GroceryList");
            GroceryListInputArea.value = "";
        })
            
        .catch(function(error) {
            console.log(error)
            //Code for handling errors
         });
    }    
}

var deleteFunction = function () {
    console.log(toDoListLength);
    for (i=0; i< toDoListLength.length; i++){
        //console.log("ToDocheckbox " + i);
        if (document.getElementById("ToDocheckbox " + i).checked = true){
            console.log(i);
        }
    }
    for (i=0; i< groceryListLength.length; i++){
        if (document.getElementById("Grocerycheckbox " + i).checked = true){
            console.log(i);
        }
    }
}

deleteFunction();
