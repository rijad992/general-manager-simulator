
const question = 'E braciki, izvini sta cu al moram da pitam, ocel biti plata ove sedmice. Kake su sanse, ovo ono';
const personName = 'Radnik van Employe';

let contentContainer = document.getElementById('content-inner');
let rightContainer = document.getElementById('right-container');

let personNameEl = document.getElementById('person-name');

personNameEl.innerText = personName;
insertTypingElement();
updateRepValue(200);
updateUserStatus('active');

setTimeout(() => {
    let employeeMessageBox = createMessageBoxElement('employe');
    let dateEl = document.createElement('div');

    ['date', 'font'].forEach(className => {
        dateEl.classList.add(className);
    });

    dateEl.innerText = 'Today';
    employeeMessageBox.appendChild(createMessageContentElement(question));

    contentContainer.appendChild(dateEl);
    contentContainer.appendChild(employeeMessageBox);
    setTimeout(() => {
        let employeeMessageBox = createMessageBoxElement('employe');

        employeeMessageBox.appendChild(createMessageContentElement('??'));
        contentContainer.appendChild(employeeMessageBox);
        removeTypingElement();
        setTimeout(() => {
            ['Da', 'Ne'].forEach(type => {
                createButtonElemenet(type);
            });
        }, 1000);
    }, 2000);
}, 3000);

function createMessageContentElement(innerText) {
    let messageContentEl = document.createElement('h5');

    ['h6', 'no-margin'].forEach(className => {
        messageContentEl.classList.add(className)
    });

    messageContentEl.innerText = innerText;

    return messageContentEl;
}

function createMessageBoxElement(type) {
    if (!['employe', 'manager'].includes(type)) {
        return;
    }
    let element = document.createElement('div');
    element.classList.add('message-box');
    element.classList.add(`${type}-message-box`);
    element.setAttribute('data-toggle', 'tooltip');
    element.setAttribute('data-placement', 'right');
    element.setAttribute('title', getTime());

    return element;
}

function getTime() {
    let now = new Date();

    return `${now.getHours()}:${now.getMinutes()}`
}

function insertTypingElement() {
    let gameContainer = document.getElementById('game-container-inner');

    let element = document.createElement('div');
    element.classList.add('typing');
    element.innerText = `${personName} is typing...`;

    gameContainer.insertBefore(element, document.getElementById('footer-outer'));
}

function removeTypingElement() {
    var element = document.getElementsByClassName('typing');
    element[0].remove();
}

function createButtonElemenet(type) {
    const classes = {
        'Da': 'success',
        'Ne': 'danger'
    }

    const listenerCallbacks = {
        'Da': onClickYesButton,
        'Ne': onClickNoButton
    }
    let footerContainer = document.querySelector('.footer-inner')
    let element = document.createElement('button');
    element.classList.add('btn');
    element.classList.add(`btn-${classes[type]}`);
    element.classList.add('button-for-click');
    element.innerText = type;
    element.addEventListener('click', listenerCallbacks[type]);
    footerContainer.appendChild(element);
}

function removeButtonElement(type) {
    var element = document.getElementsByClassName(`btn-${type}`);
    element[0].remove();
}

function createSeenElement(text) {
    let element = document.createElement('div');

    element.classList.add('seen');
    element.setAttribute('id', text);
    element.innerText = text;

    return element;
}

function onClickYesButton() {
    conversationAfterButtonClick('E brate bit ce ove sedmice', 'Tooooooooooo braca');
    ['success', 'danger'].forEach(className => {
        removeButtonElement(className);
    });
    var repEl = document.getElementById('repvalue');
    repEl.innerText = '+100';
    repEl.classList.add('text-success');

    setTimeout(() => {
        updateRepValue(100, '+');
        repEl.classList.remove('text-success');
    }, 2000)
}

function onClickNoButton() {
    conversationAfterButtonClick('Nista brate do one tamo sedmice. Zao mi je', 'normala');
    ['success', 'danger'].forEach(className => {
        removeButtonElement(className);
    });

    var repEl = document.getElementById('repvalue');
    repEl.innerText = '-100';
    repEl.classList.add('text-danger');

    setTimeout(() => {
        updateRepValue(100, '-');
        repEl.classList.remove('text-danger');
    }, 2000)
}

function conversationAfterButtonClick(reply, replyreply) {
    let employeeMessageBox = createMessageBoxElement('manager');
    let deliveredEl = createSeenElement('Delivered');

    employeeMessageBox.appendChild(createMessageContentElement(reply));
    contentContainer.appendChild(employeeMessageBox);
    contentContainer.appendChild(deliveredEl);

    setTimeout(() => {
        let seenEl = createSeenElement('Seen');
        let deliveredEl = document.getElementById('Delivered');
        deliveredEl.remove();
        contentContainer.appendChild(seenEl);
        insertTypingElement();
        setTimeout(() => {
            let employeeMessageBox = createMessageBoxElement('employe');
            employeeMessageBox.appendChild(createMessageContentElement(replyreply));
            contentContainer.appendChild(employeeMessageBox);
            updateUserStatus('offline');
            removeTypingElement();
        }, 2000);
    }, 3000);
}

function updateRepValue(repval, operator) {
    if (this.repValue == 'undefined' || !this.repValue) {
        this.repValue = 200;
    } else if (this.repValue && operator == '+') {
        this.repValue += repval;
    } else if (this.repValue && operator == '-') {
        this.repValue -= repval;
    }
    var element = document.getElementById('repvalue');
    element.innerText = this.repValue;
}

function updateUserStatus(status) {
    const data = {
        'active': {
            'class': 'bg-green',
            'title': 'Active now'
        },
        'offline': {
            'class': 'bg-gray',
            'title': 'Offline'
        }
    }

    var element = document.getElementsByClassName('person-active')[0];
    element.innerText = data[status].title;

    var statusIconEl = document.getElementsByClassName('activity-status')[0];
    statusIconEl.classList.add(data[status].class)
}