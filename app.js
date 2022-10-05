const submitBtn = document.getElementById('submitBtn');
const inputValue = document.getElementById('inputValue');
const itemsList = document.querySelector('.items-list-container');
const alertInfo = document.querySelector('.alert-container');
const clearBtn = document.querySelector('.clear-btn')

let editElement = '';
let editFlag = false;
let editId;

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addItem();
})

clearBtn.addEventListener('click', () => {
    clearItems();
})

window.addEventListener('DOMContentLoaded', () => {
    let items = getLocalStorage();
    items.forEach((item) => {
        setupItems(item.id, item.value)
    })
})

function addItem() {
    let id = new Date().getTime();

    if (!inputValue.value) {
        displayAlert("Enter value", "danger")
    } else if (inputValue.value && !editFlag) {
        const element = document.createElement('div');
        let atribute = document.createAttribute('data-id');
        atribute.value = id;
        element.setAttributeNode(atribute)
        element.classList.add('single-item-container');
        element.innerHTML = `<p class="single-item-title">${inputValue.value}</p>
    <div class="buttons-container">
      <button class="editBtn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="removeBtn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`;
        itemsList.appendChild(element);
        addToLocalMemory(id, inputValue.value);
        setToDefault();
        const editBtn = element.querySelector('.editBtn');
        editBtn.addEventListener('click', editItem)
        const removeBtn = element.querySelector('.removeBtn');
        removeBtn.addEventListener('click', removeItem)
    } else if (inputValue.value && editFlag) {
        editElement.innerHTML = inputValue.value;
        let items = getLocalStorage();
        items.forEach((item) => {
            if (item.id === editId) {
                item.value = editElement.innerHTML
            }
        })
        localStorage.setItem("list", JSON.stringify(items))
        setToDefault();
        submitBtn.innerHTML = "Add item"
    }
}

function setToDefault() {
    inputValue.value = '';
    editFlag = false;
    editElement = '';
    editId = '';
    submitBtn.innerHTML = "Add item"
}

function displayAlert(text, situation) {
    alertInfo.classList.add(situation)
    alertInfo.innerHTML = `${text}`;
    setTimeout(() => {
        alertInfo.classList.remove(situation);
        alertInfo.innerHTML = '';
    }, 1000)
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    inputValue.value = editElement.innerHTML;
    submitBtn.innerHTML = "Edit"
    editFlag = true;
    editId = Number(element.dataset.id);
}

function removeItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    itemsList.removeChild(element);
    let list = getLocalStorage();
    let updatedList = list.filter(item => item.id != element.dataset.id)
    localStorage.setItem("list", JSON.stringify(updatedList))
}

function addToLocalMemory(id, value) {
    const item = { id, value }
    let items = getLocalStorage();
    items.push(item);
    localStorage.setItem("list", JSON.stringify(items))
}

function getLocalStorage() {
    return localStorage.getItem("list") ?
        JSON.parse(localStorage.getItem("list")) : [];
}

function clearItems() {
    const items = document.querySelectorAll('.single-item-container');

    if (items.length > 0) {
        items.forEach((item) => {
            itemsList.removeChild(item)
        })
    }

    localStorage.clear("list");
    setToDefault();
}

function setupItems(id, value) {
    const element = document.createElement('div');
    let atribute = document.createAttribute('data-id');
    atribute.value = id;
    element.setAttributeNode(atribute)
    element.classList.add('single-item-container');
    element.innerHTML = `<p class="single-item-title">${value}</p>
    <div class="buttons-container">
      <button class="editBtn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="removeBtn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`;

    const editBtn = element.querySelector('.editBtn');
    editBtn.addEventListener('click', editItem)
    const removeBtn = element.querySelector('.removeBtn');
    removeBtn.addEventListener('click', removeItem)

    itemsList.appendChild(element);
}