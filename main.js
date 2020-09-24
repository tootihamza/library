const addingButton = document.getElementById("addingButton");
const formpopup = document.getElementById("form");
const bookLibrary = document.getElementById("bookLibrary");
const tableHeader = document.querySelector("thead");
const startUp = document.getElementById("startUpLib")
const table = document.querySelector("table");


const firebaseConfig = {
    apiKey: "AIzaSyBO-c_9eC5rLyJp38CYaSqlWt3fGsT31jA",
    authDomain: "my-library-feki.firebaseapp.com",
    databaseURL: "https://my-library-feki.firebaseio.com",
    projectId: "my-library-feki",
    storageBucket: "my-library-feki.appspot.com",
    messagingSenderId: "358987632644",
    appId: "1:358987632644:web:fd0ab76da137aa8bf12551"
  
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRefObject = firebase.database().ref().child("LibraryBook")

dbRefObject.once("value", snap => {
    myLibrary = snap.val();
    refreshingTheTable();
    });
    


let myLibrary = [];                                 

refreshingTheTable()


function Book() {
  // the constructor...
}

/* *******BOOKS LISTING IN THE TABLE******* */
function CleaningUpTheTable(){
    while (bookLibrary.firstChild) {
        bookLibrary.removeChild(bookLibrary.firstChild)
      }
    while(tableHeader.firstChild) {
        tableHeader.removeChild(tableHeader.firstChild)
    }
}

function refreshingTheTable() {
    CleaningUpTheTable();
    if(myLibrary.length === 0) {
        startUp.textContent = "Please Click on + to add the books";
        table.setAttribute("style", "display:none");
    }
    else {
        table.setAttribute("style", "display:table");

        startUp.textContent = "";
        let tableHeaderContainer = document.createElement("tr");
        let bookNumberHeader = document.createElement("th");
        let bookNameHeader = document.createElement("th");
        let authorNameHeader = document.createElement("th");
        let bookYearHeader = document.createElement("th");
        let readItHeader = document.createElement("th");
        let deleteItHeader = document.createElement("th")
        bookNumberHeader.textContent ="Book ID";
        bookNumberHeader.setAttribute("style", "width:10%")
        bookNameHeader.textContent = "Book Name";
        authorNameHeader.textContent = "Author Name";
        bookYearHeader.textContent = "Book Year";
        bookYearHeader.setAttribute("style", "width:10%")
        readItHeader.textContent = "Read it?";
        readItHeader.setAttribute("style", "width:10%")
        deleteItHeader.textContent = "Delete";
        deleteItHeader.setAttribute("style", "width:10%")

        tableHeaderContainer.append(bookNumberHeader, bookNameHeader, authorNameHeader, bookYearHeader, readItHeader, deleteItHeader)
        tableHeader.appendChild(tableHeaderContainer);
        for(let i = 0; i < myLibrary.length; i++) {
        let tableHead = document.createElement("tr");
        let bookNumber = document.createElement("td");
        let bookName = document.createElement("td");
        let authorName = document.createElement("td");
        let bookyear = document.createElement("td");
        let readitOrNotContainer = document.createElement("td");
        let readitOrNot = document.createElement("div");
        readitOrNotContainer.appendChild(readitOrNot);
        let deleteIt = document.createElement("td");
        let deleteItImage = document.createElement("img");
        deleteIt.appendChild(deleteItImage);
        deleteItImage.setAttribute("src", "61848.png");
        deleteItImage.setAttribute("class", "deleteClass");
        bookNumber.textContent = i;
        bookName.textContent = myLibrary[i].name;
        authorName.textContent = myLibrary[i].author;
        bookyear.textContent = myLibrary[i].year;
        if(myLibrary[i].readit === true){
            readitOrNot.textContent = "yes";
            readitOrNot.setAttribute("class", "YesIReadIt");
            readitOrNot.setAttribute("id", "reading"+i)
        }
        else {
            readitOrNot.textContent = "no";
            readitOrNot.setAttribute("class", "NoIDidNotReadIt");
            readitOrNot.setAttribute("id", "reading"+i)

        }
        deleteItImage.setAttribute("id", "delete"+i);
        //deleteIt.setAttribute("class", "deleteClass");

        tableHead.append(bookNumber, bookName, authorName, bookyear, readitOrNotContainer, deleteIt);
        bookLibrary.appendChild(tableHead);
        }
    }
}

bookLibrary.addEventListener("click", function(e){
    if(e.target.id !== "" && e.target.id[0] === "r") {
        if(myLibrary[e.target.id.slice(-1)].readit === true) {
            myLibrary[e.target.id.slice(-1)].readit = false;
            firebase.database().ref().child("LibraryBook").set(myLibrary);
            
        }
        else {
            myLibrary[e.target.id.slice(-1)].readit = true;
            firebase.database().ref().child("LibraryBook").set(myLibrary);


        }
    }

    else if(e.target.id !== "" && e.target.id[0] === "d") {
        myLibrary.splice(e.target.id.slice(-1),1)
        firebase.database().ref().child("LibraryBook").set(myLibrary);
    }

    refreshingTheTable();
})

/* *******BOOK ADDING BUTTON******* */

let formpopupAlready = false;

addingButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {

    if(formpopupAlready === false){
        formpopupAlready = true;
        let form = document.createElement("form");
        let nameBookLabel = document.createElement("label");
        nameBookLabel.textContent  = "Book Name: \n";
        let nameBookInput = document.createElement("input");
        nameBookInput.setAttribute("name", "book-name");
        nameBookInput.setAttribute("placeholder", "Add a Book Name")
        nameBookInput.setAttribute("required", "true");
        nameBookLabel.appendChild(nameBookInput);

        let authorBookLabel = document.createElement("label");
        authorBookLabel.textContent = "\n Author Name: \n";
        let authorBookInput = document.createElement("input");
        authorBookInput.setAttribute("name", "author-name");
        authorBookInput.setAttribute("placeholder", "Add an author name")
        authorBookInput.setAttribute("required", "true");
        authorBookLabel.appendChild(authorBookInput);

        let yearBookLabel = document.createElement("label");
        yearBookLabel.textContent = "\nBook year: \n";
        let yearBookInput = document.createElement("input");
        yearBookInput.setAttribute("name", "book-year");
        yearBookInput.setAttribute("required", "true");
        yearBookInput.setAttribute("placeholder", "Add a book year")
        yearBookLabel.appendChild(yearBookInput);

        let readItInput = document.createElement("input");
        readItInput.setAttribute("type", "checkbox");
        readItInput.setAttribute("name", "readit");    
        let readItLabel = document.createElement("label");
        readItLabel.textContent = "Did you read it ?";
        readItLabel.setAttribute("for", "readit");
        
        let closeUp = document.createElement("div");
        closeUp.textContent = "Cancel"
        closeUp.setAttribute("style", "border: 1px black solid;color: white; font-size: 1rem; position: absolute; right: 2px; top: 0; cursor:pointer");

        let confirmButton = document.createElement("button");
        confirmButton.setAttribute("id", "confirmButton");

        confirmButton.textContent = "CONFIRM";

        formpopup.setAttribute("style", "display: block" )
        form.append(nameBookLabel, authorBookLabel, yearBookLabel, confirmButton, readItInput, readItLabel, closeUp);
        formpopup.appendChild(form);

        closeUp.addEventListener("click", function(){
            formpopup.removeChild(formpopup.firstChild);   
            formpopupAlready = false;
            formpopup.setAttribute("style", "display:none" )
        })

        confirmButton.addEventListener("click", function(e){
            e.preventDefault()
            if(nameBookInput.value ==="" || authorBookInput.value === ""){
                alert("Please Fill out all the form")
            }
            else if(yearBookInput.value ==="" || isNaN(yearBookInput.value) || yearBookInput.value.toString().length !== 4){
                alert("Please Verify the year of the book")
            }
            else {
                myLibrary[myLibrary.length] = {name: nameBookInput.value, author: authorBookInput.value, year: yearBookInput.value, readit: readItInput.checked};
                firebase.database().ref().child("LibraryBook").set(myLibrary);
                refreshingTheTable()
                formpopup.removeChild(formpopup.firstChild);   
                formpopupAlready = false;
                formpopup.setAttribute("style", "display: none" )
                }
            })
        }
    else {
        formpopup.removeChild(formpopup.firstChild);   
        formpopupAlready = false;
        formpopup.setAttribute("style", "display:none" )
    }
}
