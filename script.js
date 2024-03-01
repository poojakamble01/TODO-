const INPUT_BOX_El = document.getElementById('inputBox');
const LIST_EL = document.getElementById('list');
const TOGGLE_BTN = document.getElementById('toggle');
// Initially set the display property to none
TOGGLE_BTN.style.display = 'none';


const STORE_NAME = 'tasklist';

const taskList = getTasklistFromMemory();


INPUT_BOX_El.addEventListener('keydown', function (event) {
    let space = INPUT_BOX_El.value.trim();
    if (space === " ") {
        return alert("Please Enter a Task");
    };


    if (event.keyCode === 13) {
        taskList.unshift(INPUT_BOX_El.value);
        INPUT_BOX_El.value = '';
        updateDisplay();
    }
})

function submitRequest() {
    let space = INPUT_BOX_El.value.trim();
    if (space === "") {
        return alert("Please Enter a Task");
    };
    taskList.unshift(INPUT_BOX_El.value);
    INPUT_BOX_El.value = '';
    updateDisplay();
}



function updateDisplay() {
    LIST_EL.innerHTML = '';
    taskList.forEach(function (item, index) {
        const EL = createListItem(item, index);
        LIST_EL.append(EL);
    })
    storeInMemory();
}

function createListItem(value, index) {
    // <li> Buy Food <span>&times;</span></li>
    const LI_EL = document.createElement('li');

    // Append the text content to the list item
    LI_EL.append(document.createTextNode(value));

    const SPAN_MAIN = document.createElement('span');

    // Create the toggle label
    const TOGGLE_LABEL = document.createElement('label');
    TOGGLE_LABEL.classList.add('toggle');

    // Create the checkbox
    const CHECKBOX = document.createElement('input');
    CHECKBOX.type = 'checkbox';

    // Create the slider span
    const SLIDER_SPAN = document.createElement('span');
    SLIDER_SPAN.classList.add('slider');

    // Create the labels span
    const LABELS_SPAN = document.createElement('span');
    LABELS_SPAN.classList.add('labels');
    LABELS_SPAN.setAttribute('data-on', 'Complete');
    LABELS_SPAN.setAttribute('data-off', 'Pending');

    // Append elements to the toggle label
    TOGGLE_LABEL.appendChild(CHECKBOX);
    TOGGLE_LABEL.appendChild(SLIDER_SPAN);
    TOGGLE_LABEL.appendChild(LABELS_SPAN);

    // Append the toggle label to the list item
    SPAN_MAIN.appendChild(TOGGLE_LABEL);

    // <li class="toggle">
    //     <input type="checkbox">
    //     <span class="slider"></span>
    //     <span class="labels" data-on="Complete" data-off="Pending"></span>
    // </li>

    // Append the remove 'x' span
    const SPAN_EL = document.createElement('span');
    SPAN_EL.innerHTML = '&times;';
    SPAN_EL.style.cursor = 'pointer';
    SPAN_MAIN.append(SPAN_EL);
    LI_EL.append(SPAN_MAIN);

    // Set up the click event for removing the item
    SPAN_EL.onclick = removeItem.bind(null, index);

    CHECKBOX.addEventListener('change', function () {
        const isChecked = CHECKBOX.checked;
        const state = isChecked ? 'Complete' : 'Pending';
        localStorage.setItem(`item_${index}`, state);
    });

    // Check local storage for the saved state
    const savedState = localStorage.getItem(`item_${index}`);
    if (savedState) {
        CHECKBOX.checked = savedState === 'Complete';
    }

    return LI_EL;
}


function removeItem(index) {
    taskList.splice(index, 1);
    updateDisplay();
}

function storeInMemory() {
    localStorage.setItem(STORE_NAME, taskList);
}

function getTasklistFromMemory() {
    const storedValue = localStorage.getItem(STORE_NAME);
    return storedValue ? storedValue.split(',') : [];
}

updateDisplay();