import { creationOfId } from "./creationId.js";    

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let todo = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const root = document.getElementById('root');
const mainContainer = document.createElement('main');
mainContainer.classList.add('main-container');

//header
const header = document.createElement('header');
const container = document.createElement('div');
const headerWrap = document.createElement('div');
const headerDelletedBtn = document.createElement('button');
const headerInput = document.createElement('input');
const headerAddBtn = document.createElement('button');

header.classList.add('header');
container.classList.add('container');
headerWrap.classList.add('header-wrap');
headerDelletedBtn.classList.add('header-deleted-btn');
headerInput.classList.add('header-input');
headerAddBtn.classList.add('header-add-btn');

headerDelletedBtn.textContent = 'Delete All';
headerAddBtn.textContent = 'Add';
headerInput.setAttribute('type', 'text');
headerInput.setAttribute('placeholder', 'Enter todo...');

root.appendChild(mainContainer);
mainContainer.append(header);
header.append(container);
container.append(headerWrap);
headerWrap.append(headerDelletedBtn);
headerWrap.append(headerInput);
headerWrap.append(headerAddBtn);
//Header events 

headerDelletedBtn.addEventListener('click', deletedAll)


//Card section
const cardSection = document.createElement('section');
const cardSectionContainer = document.createElement('div');
const cardWrap = document.createElement('div');

cardSection.classList.add('card-section');
cardSectionContainer.classList.add('container');
cardWrap.classList.add('card-wrap');

mainContainer.append(cardSection);
cardSection.append(cardSectionContainer);
cardSectionContainer.append(cardWrap);

headerAddBtn.addEventListener('click', createCard);

let todosLenght = JSON.parse(localStorage.getItem('todos'));
    for(let i = 0; i < todosLenght.length; i++) {
        var todosId = todosLenght[i].id
        var todosText = todosLenght[i].text
        var todosDate = todosLenght[i].date
        var todosIsChecked = todosLenght[i].isChecked
        reternCard(todosId, todosText, todosDate, todosIsChecked);
    }

function createCard () {
    const card = document.createElement('div');
    const cardDescription = document.createElement('div');
    const cardDescriptionP = document.createElement('p');
    const cardBtnContent = document.createElement('div');
    const cardAcceptBtn = document.createElement('button');
    const cardDatetBtn = document.createElement('button');
    const cardCanceltBtn = document.createElement('button');
    const cardAcceptSpan = document.createElement('span');
    const date = new Date();

    card.id = creationOfId();

    cardDescriptionP.textContent = headerInput.value;
   
    card.classList.add('card');
    cardDescription.classList.add('card-description');
    cardBtnContent.classList.add('card-btn-content');
    cardAcceptBtn.classList.add('card-accept-btn');
    cardDatetBtn.classList.add('card-date-btn');
    cardCanceltBtn.classList.add('card-cancel-btn');
    cardAcceptSpan.classList.add('not-active');

    cardWrap.append(card);
    card.append(cardDescription);
    cardDescription.append(cardDescriptionP);
    card.append(cardBtnContent);
    cardBtnContent.append(cardAcceptBtn);
    cardAcceptBtn.append(cardAcceptSpan);
    cardBtnContent.append(cardDatetBtn);
    cardBtnContent.append(cardCanceltBtn);

    cardDatetBtn.textContent = getDate();

    cardAcceptSpan.innerHTML = '&#x2713';
    cardCanceltBtn.innerHTML = '&#x2717 delete';
    
    //Card events

    cardCanceltBtn.addEventListener('click', cancelCard) ;
    headerDelletedBtn.addEventListener('click', deletedAll);    
    cardAcceptBtn.addEventListener('click', checkBoxBtn);
    cardDatetBtn.addEventListener('click', getTime);
    cardAcceptBtn.addEventListener('click', () => checkedCard(cardCanceltBtn));


    function getDateForLocalStorage() {
        let getHour = date.getHours();
        let getMinut = date.getMinutes();
        let getDate = date.getDate();
        let getMonth= months[date.getMonth()].substring(0,3);
        return `${getHour}:${getMinut}  ${getDate} ${getMonth}`;
    }

    function cancelCard (o) { 
        let item = o.target.closest('.card');
        item.remove();
    }
    
    function checkBoxBtn() {
        cardAcceptSpan.classList.toggle('active')
        cardAcceptBtn.classList.toggle('card-accept-btn-active')
        card.classList.toggle('card-active');
        cardDescription.classList.toggle('card-description-active');
    }   

    function getDate() {
        let day = date.getDate();
        let month = (date.getMonth() + 1);
        let year = date.getFullYear();
        return `${day}:${month}:${year}`
    }
    
    function getTime() {
        let hour = date.getHours();
        let minut = date.getMinutes();
        let second = date.getSeconds();
        return alert(`${hour}h:${minut}m:${second}s`)
    }

    const cardDetails = {
        id: card.id,
        date: getDateForLocalStorage(),
        text : headerInput.value,
        isChecked: false
    }

    todo.push(cardDetails);

    localStorage.setItem(`todos`, JSON.stringify(todo));
}


function reternCard (todosId, todosText, todosDate, todosIsChecked) {
    const card = document.createElement('div');
    const cardDescription = document.createElement('div');
    const cardDescriptionP = document.createElement('p');
    const cardBtnContent = document.createElement('div');
    const cardAcceptBtn = document.createElement('button');
    const cardDatetBtn = document.createElement('button');
    const cardCanceltBtn = document.createElement('button');
    const cardAcceptSpan = document.createElement('span');
    const date = new Date();

    card.id = todosId

    cardDescriptionP.textContent = todosText
  
    card.classList.add('card');
    cardDescription.classList.add('card-description');
    cardBtnContent.classList.add('card-btn-content');
    cardAcceptBtn.classList.add('card-accept-btn');
    cardDatetBtn.classList.add('card-date-btn');
    cardCanceltBtn.classList.add('card-cancel-btn');
    cardAcceptSpan.classList.add('not-active');

    cardWrap.append(card);
    card.append(cardDescription);
    cardDescription.append(cardDescriptionP);
    card.append(cardBtnContent);
    cardBtnContent.append(cardAcceptBtn);
    cardAcceptBtn.append(cardAcceptSpan);
    cardBtnContent.append(cardDatetBtn);
    cardBtnContent.append(cardCanceltBtn);

    cardDatetBtn.textContent = todosDate   

    cardAcceptSpan.innerHTML = '&#x2713';
    cardCanceltBtn.innerHTML = '&#x2717 delete';
    
    //Card events

    cardCanceltBtn.addEventListener('click', cancelCard) ;
    cardCanceltBtn.addEventListener('click', deleteCard)
    headerDelletedBtn.addEventListener('click', deletedAll);    
    cardAcceptBtn.addEventListener('click', checkBoxBtn());
    cardAcceptBtn.addEventListener('click', checkBox);
    cardAcceptBtn.addEventListener('click', () => checkedCard(cardCanceltBtn))


    function cancelCard (o) { 
        let item = o.target.closest('.card');
        item.remove();
    }
    
    
    function checkBox() {
            cardAcceptSpan.classList.toggle('active')
            cardAcceptBtn.classList.toggle('card-accept-btn-active')
            card.classList.toggle('card-active');
            cardDescription.classList.toggle('card-description-active');
    }

    function checkBoxBtn() {
        if(todosIsChecked === true) {
            cardAcceptSpan.classList.add('active')
            cardAcceptBtn.classList.add('card-accept-btn-active')
            card.classList.add('card-active');
            cardDescription.classList.add('card-description-active');
        } else {
            cardAcceptSpan.classList.add('not-active')
            cardAcceptBtn.classList.add('card-accept-btn')
            card.classList.add('card');
            cardDescription.classList.add('card-description');
        }
    }   

        function deleteCard() {  
            let cardCanceltBtnParent = cardCanceltBtn.parentNode;
            let cancelGrandParent = cardCanceltBtnParent.parentNode.id
            var filteredArray = todo.filter( function(item) {
            return item.id !== cancelGrandParent
        })
        
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(filteredArray))
    }

    const cardDetails = {
        id: card.id,
        date: todosDate,
        text : todosText,
        isChecked: false
    }

}

function deletedAll() {
    localStorage.removeItem('todos');
    cardWrap.innerHTML = '';
}


function checkedCard(cardCanceltBtn) {
    let cardCanceltBtnParent = cardCanceltBtn.parentNode;
    let cancelGrandParent = cardCanceltBtnParent.parentNode.id
    
    let filteredArrayCheck = todo.map(function(item) {
        if(item.id === cancelGrandParent) {
            return {
                ...item, isChecked: !item.isChecked
            }
        } else {
                return item;
        }
    })

    todo = filteredArrayCheck
    localStorage.setItem('todos', JSON.stringify(filteredArrayCheck));
    console.log(cancelGrandParent);
}