var api_url = 'http://localhost:3000/';
var toDoContainer= document.getElementById("toDoContainer");
var groceryContainer = document.getElementById("groceryContainer");

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
        })
        .catch(function(error) {
            console.log(error)
        });
}

getToDoList();
getGroceryList();