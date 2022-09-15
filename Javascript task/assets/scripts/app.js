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
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const searchField = document.querySelector('#search')


toggleDialogueBtn.addEventListener('click', function(){
    toggleAddDialogue()
})

cancelBtn[0].addEventListener('click', function(){
    clearFields();
    toggleAddDialogue();
    location.reload()
})

cancelBtn[1].addEventListener('click', function(){
    clearFields();
    toggleDelDialogue();
})

let newId = 0
let bookList = [];
let listItems = []

function retrieveBooks (books) {
    for (let book of books) {
    const newLi = document.createElement('li')

    //first div
    newLi.classList.add('book-element')
    const imgDiv = document.createElement('div')
    imgDiv.classList.add('book-element__image')
    const img = document.createElement('img')
    img.setAttribute('src', book.url)
    imgDiv.append(img)
    newLi.append(imgDiv)

    //second div
    const textDiv = document.createElement('div')
    textDiv.classList.add('book-element__info')
    const title = document.createElement('h2')
    title.innerText = book.title
    const rate = document.createElement('p')
    rate.innerText = `${book.rating}/5`
    textDiv.append(title)
    textDiv.append(rate)
    newLi.append(textDiv)
    newLi.id = `${book.itemId}`
    listItems.push(newLi)
    
    //close li
    container.append(newLi)
}
}

let noOfDelets
const pageLimit = 3;
let pageCount = 2;
let currentPage;

window.addEventListener('load', () => {
    //window.localStorage.clear()
    let length = JSON.parse(window.localStorage.getItem('lastLength')) 

    if (length > 0){
        bookList = JSON.parse(window.localStorage.getItem('bookStorage'))
        retrieveBooks(bookList)

        newId = bookList[bookList.length-1].itemId + 1
        noOfDelets = JSON.parse(window.localStorage.getItem('deleteCount'))

        toggleEntryText(length)
        if (length > 2) {
             pageCount = Math.ceil(length / pageLimit);
        }
        getPaginationNumbers()
        setCurrentPage(1)
        document.querySelectorAll(".pagination-number").forEach((button) => {
            console.log('clicked')
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex) {
              button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
              });
            }
          })
    } else {
        newId = 0
        noOfDelets = 0
    }
})


const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
   
    paginationNumbers.appendChild(pageNumber);
  };
   
  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  }

  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
       
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };


  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
     
    handleActivePageNumber()

    const prevRange = (pageNum - 1) * pageLimit;
    const currRange = pageNum * pageLimit;
   
    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };

id = newId;
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

                window.localStorage.setItem('bookStorage', JSON.stringify(bookList))
                window.localStorage.setItem('lastLength', JSON.stringify(bookList.length))

                toggleEntryText(bookList.length)
                
            }
        }     
    }
})

let removeNum;

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
    listItems.push(newLi)

    //close li
    container.append(newLi)
}
// let str = 'test'
// str.includes()

searchField.addEventListener('input', (e) => {
    for (let i=0;i<bookList.length;i++) {
        if (!bookList[i].title.includes(searchField.value)) {
            listItems[i].classList.add('hidden')
        } else {
            listItems[i].classList.remove('hidden')
        }
    }
})



let delTarget
container.addEventListener('click', function(e){
     toggleDelDialogue()
     //console.log(bookList.length)
     delTarget = e.target
     //console.log(bookList)
     //console.log(listItems)
})
delBtn.addEventListener('click', ()=> {
    deleteBook(delTarget,removeNum)
    // console.log(bookList.length)
    toggleEntryText(bookList.length)
    toggleDelDialogue()
    window.localStorage.setItem('bookStorage', JSON.stringify(bookList))
    window.localStorage.setItem('lastLength', JSON.stringify(bookList.length))
    location.reload()
})

function deleteBook (node){
    if (node.nodeName !== 'LI') {
        return deleteBook(node.parentNode)
    } else {
        console.log(node.id)
        node.remove()
        if (node.id == 0){
            bookList.splice(0,1)
            noOfDelets +=1
        } else {
            let delIndex = node.id - noOfDelets
            bookList.splice(delIndex,1)
            noOfDelets +=1;
            window.localStorage.setItem('deleteCount',JSON.stringify(noOfDelets))
        }
        return 
    }
}


function toggleEntryText(length){
    if (length != 0){
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
