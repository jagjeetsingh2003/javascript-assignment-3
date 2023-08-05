// Function for creating a new to-do items
function myCreateTodo() {
    const inputValue = document.getElementById("todoInput").value;
    if (inputValue === "") return;

    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="checkbox"> ${inputValue} <button class="deleteButton">Delete</button>`;
    document.getElementById("todoList").appendChild(li);

    document.getElementById("todoInput").value = ""; // Clear the input field

    // Adding event listeners on the newly created checkboxes and delete buttons
    addCheckboxEvent(li.querySelector(".checkbox"));
    addDeleteButtonEvent(li.querySelector(".deleteButton"));

    // Moving the checked items to the bottom of the list
    reorderList();
}

// Function for handling the change event for checkboxes
function handleCheckboxChange(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add("checked");
        playDingSound(); // Play the ding sound when checked
    } else {
        li.classList.remove("checked");
    }

    // Move checked items to the bottom of the list
    reorderList();
}
// Function for playing the ding sound
function playDingSound() {
    const dingSound = document.getElementById("dingSound");
    dingSound.currentTime = 0; // Reset the audio from the start
    dingSound.play(); // Play the ding sound
}

// Function for handling the click event on the delete buttons.
function handleDeleteButtonClick(deleteButton) {
    const li = deleteButton.parentElement;
 
   li.classList.add("deleted");
    li.addEventListener("animationend", () => {
        li.remove();
    });
}

// Function to reordering    the list    items based on checked status
function reorderList() {
    const todoList = document.getElementById("todoList");
    const listItems = todoList.getElementsByTagName("li");
    const checkedItems = [];
    const uncheckedItems = [];

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].querySelector(".checkbox").checked) {
            checkedItems.push(listItems[i]);
        } else {
            uncheckedItems.push(listItems[i]);
        }
    }

    // There is clearing of the the existing list
    todoList.innerHTML = "";

    // Append unchecked items at the first of the list
    for (let i = 0; i < uncheckedItems.length; i++) {
        todoList.appendChild(uncheckedItems[i]);
    }

    // Appending checked items next
    for (let i = 0; i < checkedItems.length; i++) {
        todoList.appendChild(checkedItems[i]);
    }
}

// Function for adding   event listeners on the checkboxes added to the web page
function addCheckboxEvent(checkbox) {
    checkbox.addEventListener("change", () => {
        handleCheckboxChange(checkbox);
    });
}

// Function for adding event listeners on to the delete buttons
function addDeleteButtonEvent(deleteButton) {
    deleteButton.addEventListener("click", () => {
        handleDeleteButtonClick(deleteButton);
    });
}

// Adding event listener on the Add button
document.getElementById("addButton").addEventListener("click", () => {
    myCreateTodo();
});

// Adding event listener for pressing Enter key in the input field so that new item can be added to do list
document.getElementById("todoInput").addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        myCreateTodo();
    }
});
const checkboxes = document.querySelectorAll(".checkbox");
const deleteButtons = document.querySelectorAll(".deleteButton");
checkboxes.forEach((checkbox) => {
    addCheckboxEvent(checkbox);
});
deleteButtons.forEach((deleteButton) => {
    addDeleteButtonEvent(deleteButton);
});