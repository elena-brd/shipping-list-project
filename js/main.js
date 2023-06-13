const inputForm = document.getElementById('input-form');
const inputItem = document.getElementById('input-item');
const listItems = document.getElementById('list-items');

const clearBtn = document.getElementById('clear');
const submitBtn = document.getElementById('btn-submit')
const search = document.getElementById('search');

let isEditMode = false;


function addItems(e) {
    e.preventDefault();

    const newItem = inputItem.value

    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('btn-close red-xmark');

    // check for edi mode
    if (isEditMode) {
        const itemToEdit = listItems.querySelector('.edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }

    // append elements
    listItems.appendChild(li);
    li.appendChild(button)

    console.log(li);
    // reset
    inputItem.value = '';

    resetUI();
}

// create button
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
// create icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// remove items
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('btn-close')) {
        e.target.parentElement.parentElement.remove()
    } else {
        editItem(e.target);
    }
    resetUI();
}

// edit item
function editItem(item) {
    isEditMode = true;

    // select item not to be in edit mode
    listItems.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');

    submitBtn.innerHTML = ' <i class="fa-solid fa-pen"></i> Update Item';
    submitBtn.style.backgroundColor = '#b4e6e1';
    submitBtn.style.color = '#181818';
    inputItem.value = item.textContent;
}

// remove all items
function clearItems() {
    const list = document.querySelectorAll('li');

    list.forEach((item) => {
        item.remove();
    })

    resetUI();
}

// search items
function searchItems(e) {
    const list = document.querySelectorAll('li');
    const itemtext = e.target.value.toLowerCase();

    list.forEach((item) => {
        const itemName = item.textContent.toLowerCase();

        if (itemName.indexOf(itemtext) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

// on focus
function onFocus() {
    inputItem.style.outlineColor = '#b4e6e1';
    inputItem.style.outlineWidth = '2px';
    inputItem.style.outlineStyle = 'solid';
    inputItem.style.border = 'none'

}

// on blur 
function onBlur() {
    inputItem.style.outlineColor = '#d3d3d3';
    inputItem.style.outlineWidth = '2px';
    inputItem.style.outlineStyle = 'solid';
}

// reset ui
function resetUI() {
    const list = document.querySelectorAll('li');
    // const search = document.getElementById('search');
    if (list.length === 0) {
        search.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        search.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}
// add event listener
inputForm.addEventListener('submit', addItems);
listItems.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
search.addEventListener('input', searchItems);
inputItem.addEventListener('focus', onFocus);
inputItem.addEventListener('blur', onBlur);

resetUI();