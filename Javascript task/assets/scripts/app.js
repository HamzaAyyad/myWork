const toggleDialogueBtn = document.querySelector('header button');
const addContent = document.querySelector('#add-modal')
const backDrop = document.querySelector('#backdrop')
const title = document.querySelector('#title')
const imageURL = document.querySelector('#image-url')
const rating = document.querySelector('#rating')
const cancelBtn = document.querySelectorAll('.btn.btn--passive')
const addBtn = document.querySelector('.btn.btn--success')
const container = document.querySelector('#book-list')
const emptyCard = document.querySelector('#entry-text')
const delContent = document.querySelector('#delete-modal')
const delBtn = document.querySelector('.btn.btn--danger')
const listItems = document.querySelectorAll('li')


toggleDialogueBtn.addEventListener('click', function(){
    toggleAddDialogue()
})

cancelBtn[0].addEventListener('click', function(){
    clearFields();
    toggleAddDialogue();
})


cancelBtn[1].addEventListener('click', function(){
    clearFields();
    toggleDelDialogue();
})


const bookList = [];
let delIndex = 0;
let id = 0;
addBtn.addEventListener('click', function(){
    const book = {}
    let bookTitle = ''; let bookUrl =''; let bookRating ='';
    if (title.value =='' || imageURL.value ==='' || rating ==''){
        alert('Please fill all the information')
    } else {
        
        if (imageURL.value.search('(https?:\/\/.*\.(?:png|jpg|jpeg))') == -1){
            alert('Enter a valid URL')
        } else {
            if (parseInt(rating.value) < 0 || parseInt(rating.value) > 5){
                alert('Please enter a number between 0 and 5')
            } else {
                book.itemId = id++;
                book.title = title.value;
                book.url = imageURL.value;
                book.rating = rating.value;
                clearFields()
                createListItem(book)
                bookList.push(book)
                toggleEntryText()
            }
        }     
    }
})

let removeNum;
let noOfDelets = 0;

function createListItem (item){
    const newLi = document.createElement('li')

    //first div
    newLi.classList.add('book-element')
    const imgDiv = document.createElement('div')
    imgDiv.classList.add('book-element__image')
    const img = document.createElement('img')
    img.setAttribute('src', item.url)
    imgDiv.append(img)
    newLi.append(imgDiv)

    //second div
    const textDiv = document.createElement('div')
    textDiv.classList.add('book-element__info')
    const title = document.createElement('h2')
    title.innerText = item.title
    const rate = document.createElement('p')
    rate.innerText = `${item.rating}/5`
    textDiv.append(title)
    textDiv.append(rate)
    newLi.append(textDiv)
    newLi.id = `${item.itemId}`

    //close li
    container.append(newLi)

    removeNum = item.itemId
}

let delTarget
container.addEventListener('click', function(e){
     toggleDelDialogue()
     delTarget = e.target
})
delBtn.addEventListener('click', ()=> {
    deleteBook(delTarget,removeNum)
    console.log(bookList.length)
    console.log(bookList)
    toggleEntryText()
    toggleDelDialogue()
})

function deleteBook (node,removeNo){
    if (node.nodeName !== 'LI') {
        return deleteBook(node.parentNode)
    } else {
        node.remove()
        if (node.id == 0){
            bookList.splice(0,1)
            noOfDelets +=1
        } else {
            let delIndex = node.id - noOfDelets
            bookList.splice(delIndex,1)
            noOfDelets +=1;
        }
        return 
    }
}

function toggleEntryText(){
    if (bookList.length != 0){
        emptyCard.style.display = 'none'
    } else {
        emptyCard.style.display = 'block'
    }
}

function toggleAddDialogue(){
    addContent.classList.toggle('visible')
    backDrop.classList.toggle('visible')
}

function toggleDelDialogue(){
    delContent.classList.toggle('visible')
    backDrop.classList.toggle('visible')
}

function clearFields (){
    title.value= ''
    imageURL.value = ''
    rating.value = ''
}
