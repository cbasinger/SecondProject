var toDoContainer= document.getElementById("toDoContainer");
var groceryContainer = document.getElementById("groceryContainer");
var toDoList = document.getElementById("toDoList");
var groceryList = document.getElementById("groceryList");

var createSubmitButton = function (listType) {
    let submitDiv = document.createElement("div");
    submitDiv.className = "row";
    submitDiv.id = listType + " submitButtonDiv";
    let submitButtonColumn = document.createElement("div");
    submitButtonColumn.className = "col-md-1";
    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.innerHTML = "Submit";
    let inputAreaColumn = document.createElement("div");
    inputAreaColumn.className = "col-md-11";
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

var createListItem = function (item, listType, listItemId) {
    let container = document.createElement("div");
    container.id = listType + "Element" + item.id;
    container.className = "row";
    let checkBoxColumn = document.createElement("div");
    checkBoxColumn.className = "col-md-1";
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBoxColumn.appendChild(checkBox);
    container.appendChild(checkBoxColumn);
    let ItemColumn = document.createElement("div");
    ItemColumn.className = "col-md-11";

    if (listType == "ToDoList"){
        checkBox.id = "ToDocheckbox " + listItemId;
        checkBox.addEventListener('click', toDoDeleteFunction);
        let toDoItem = document.createElement("p");
        toDoItem.innerHTML = item.todoitem;
        ItemColumn.appendChild(toDoItem);
        container.appendChild(ItemColumn);
        toDoContainer.appendChild(container);
    }

    else if (listType == "GroceryList") {
        checkBox.id = "Grocerycheckbox " + listItemId;
        checkBox.addEventListener('click', groceryDeleteFunction);
        let groceryItem = document.createElement("p");
        groceryItem.innerHTML = item.groceryitem;
        ItemColumn.appendChild(groceryItem);
        container.appendChild(ItemColumn);
        groceryContainer.appendChild(container);
    }
}

var getToDoList = function () {
    axios.get('/api/todos')
        .then(function(data) {
            let allToDos = data.data;
            for (i=0; i< allToDos.length; i++){
                createListItem(allToDos[i], "ToDoList", allToDos[i].id);
            }
        })
        .catch(function(error) {
            console.log(error)
        });
}

var getGroceryList = function(){
    axios.get('/api/grocery')
        .then(function(data) {
            let allGroceryList = data.data;
            for (i=0; i< allGroceryList.length; i++){
                createListItem(allGroceryList[i], "GroceryList", allGroceryList[i].id);
            }
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
        axios.post(`/api/todo`, requestBody)
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
        axios.post(`/api/grocery`, requestBody)
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

var toDoDeleteFunction = function () {
    var str = this.id;
    var res = str.slice(12, str.length);
    var index = parseInt(res, 10)

    axios.delete(`/api/todo/${index}`)
        .then(function(result) {
            toDoContainer.innerHTML="";
            getToDoList();
        })        
        .catch(function(error) {
            console.log(error)
            //Code for handling errors
        });
}   

var groceryDeleteFunction = function () {
    var str = this.id;
    var res = str.slice(15, str.length);
    var index = parseInt(res, 10)

    axios.delete(`/api/grocery/${index}`)
        .then(function(result) {
            groceryContainer.innerHTML="";
            getGroceryList();
        })        
        .catch(function(error) {
            console.log(error)
            //Code for handling errors
        });
}