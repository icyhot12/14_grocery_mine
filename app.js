const submitBtn = document.getElementById('submitBtn');
const inputValue = document.getElementById('inputValue');
const itemsList = document.querySelector('.items-list-container');
const alertInfo = document.querySelector('.alert-container');

let editElement = '';
let editFlag = false;

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addItem();
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
        setToDefault();
        const editBtn = element.querySelector('.editBtn');
        editBtn.addEventListener('click', editItem)
        const removeBtn = element.querySelector('.removeBtn');
        removeBtn.addEventListener('click', removeItem)
    } else if (inputValue.value && editFlag) {
        editElement.innerHTML = inputValue.value;
        setToDefault();
        submitBtn.innerHTML = "Add item"
    }
}

function setToDefault() {
    inputValue.value = '';
    editFlag = false;
    editElement = '';
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
}

function removeItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    itemsList.removeChild(element);
}