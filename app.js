// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clear = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);
// clear items
clear.addEventListener('click', clearItems);
// 




// ****** FUNCTIONS **********
function addItem(e) {
     e.preventDefault();
     console.log(grocery.value);
     const value = grocery.value;
     // creating unique id
     const id = new Date().getTime().toString();
     if (value && !editFlag) {
          // /create element
          const element = document.createElement('article');
          // add class
          element.classList.add('grocery-item');
          // create id
          const attr = document.createAttribute('data-id');
          attr.value = id;
          element.setAttributeNode(attr);
          element.innerHTML = `<p class="title">${value}</p>
          <div class="button-container">
               <button class="edit-btn">
                    <i class="fas fa-edit"></i>
               </button>
               <button class="delete-btn">
                    <i class="fas fa-trash"></i>
               </button>
          </div>`;

          // delete and edit button are only accessible here, that is why I wrote 
          // add listener here
          const deleteBtn = element.querySelector('.delete-btn');
          console.log(deleteBtn);
          const editBtn = element.querySelector('.edit-btn');
          deleteBtn.addEventListener('click', deleteItem);
          editBtn.addEventListener('click', editItem);

          // append child
          list.appendChild(element);
          // dissplay alert
          showAlert('new item added', 'success');
          // show container
          container.classList.add('show-container');
          // add to local storage
          addToLocalStorage(id, value);
          // setBackToDefault
          setBackToDefault();
     } else if (value && editFlag) {
          editElement.innerHTML = value;
          showAlert('value changed', 'success');
          setBackToDefault();
     } else {
          showAlert('please enter value', 'danger');
     }
}

// display alert
function showAlert(text, action) {
     alert.textContent = text;
     alert.classList.add(`alert-${action}`);

     // remove alert
     setTimeout(function () {
          alert.textContent = '';
          alert.classList.remove(`alert-${action}`);
     }, 2000)
}
// clear items
function clearItems() {
     const items = document.querySelectorAll('.grocery-item');
     if (items.length > 0) {
          items.forEach(function (item) {
               list.removeChild(item);
          });
     }
     container.classList.remove('show-container');
     showAlert('empty list', 'success');
     setBackToDefault();
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {

}


//delete function 
function deleteItem(e) {
     const element = e.currentTarget.parentElement.parentElement;
     const id = element.dataset.id;
     list.removeChild(element);
     if (list.children.length === 0) {
          container.classList.remove('show-container');
     }
     showAlert('item removed successfully', 'success');
     setBackToDefault();
     // remove from local storage
     // removeFromLocalstorage(id);
}

//edite function 
function editItem(e) {
     const element = e.currentTarget.parentElement.parentElement;
     // set edit item
     editElement = e.currentTarget.parentElement.previousElementSibling;
     // set form value
     grocery.value = editElement.innerHTML;
     editFlag = true;
     editID = element.dataset.id;
     submitBtn.textContent = 'edit';
}

// set back to default
function setBackToDefault() {
     grocery.value = '';

     // for later ussage (come in handy)
     editFlag = false;
     editID = '';
     submitBtn.textContent = 'submit';
}

// ****** SETUP ITEMS **********