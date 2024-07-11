// Book cuntructor

function Book(title,author,isbn){
   this.title=title;
   this.author=author;
   this.isbn=isbn;
}

 // Add Book to list
function UI(){
   
    UI.prototype.addBookTolist=function(book){
     const list=document.querySelector('#book-list')
    //  console.log(list)
    const row=document.createElement('tr');
    row.innerHTML=`
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td class="delete">
                     <span class="btn btn-danger">X</span>    
                    <td>`;

        list.appendChild(row) 
        this.buttondisplay() // Check button visibility after adding book
        // console.log(list)  
        this.clearAlert()       
    }

    UI.prototype.clearfield=function(){
       document.querySelector('#title').value=''
       document.querySelector('#author').value=''
       document.querySelector('#ISBN').value=''
    }


    UI.prototype.deletebook=function(target){
       if(target.className==="delete"){
        target.parentElement.remove()
       }
    }

 // Existing methods...

 UI.prototype.buttondisplay=function(){
    const clearbtn=document.querySelector('.Clear')
    const booklist=document.querySelector('#book-list')

    if(booklist.children.length===0){
        clearbtn.style.display = 'none';
    }else{
        clearbtn.style.display = 'block';
    }
 }

    UI.prototype.clearevent=function(){
        document.querySelector('#book-list').innerHTML="";
        this.buttondisplay() // Check button visibility after clearing all books
    }

    UI.prototype.showAler=function(massage,className){

        this.clearAlert()
        // create div
       const div=document.createElement('div')

        //add class name
        div.className=`alert ${className}`
        //add text
        div.innerText=massage

        document.querySelector('.show-alert').appendChild(div)

        setTimeout(function(){
            document.querySelector('.alert').remove()
            this.clearAlert()
        },2000)

    }

    UI.prototype.clearAlert=function(){
        const clearCurrentAlert=document.querySelector('.alert')
        // console.log(clearCurrentAlert)

        if(clearCurrentAlert){
            clearCurrentAlert.remove()
        }
    }   

    UI.prototype.checkingisbn=function(isbn){
       const tablelist= document.querySelectorAll('#book-list tr')
       for(let list of tablelist){
        if(list.querySelector('td:nth-child(3)').textContent === isbn){
            return isbn
            // console.log(list)
        }
        else{
            return false
        }
       }
    }
}



// add Event

document.querySelector('#book-form').addEventListener('submit',addform)

function addform(e){
  e.preventDefault()
  
  const title=document.querySelector('#title').value
  const author=document.querySelector('#author').value
  const isbn=document.querySelector('#ISBN').value
//   console.log(title,author,isbn)
const ui=new UI()

if(ui.checkingisbn(isbn)){
    ui.showAler("ISBN already exists in the list", 'alert-danger');
}else{
    const book=new Book(title,author,isbn);
    if(title===""|| author==="" ||isbn ===""){
        ui.showAler("please add the field",'alert-danger')
    
}else {
    ui.addBookTolist(book)
    ui.clearfield()
    ui.showAler("Book added succesfully","alert-success")
} 
}
 
}
// Delete event
document.querySelector('#book-list').addEventListener('click',function(e){
    // console.log(e.target.parentElement)

    if(e.target.parentElement.className="delete"){
      const ui=new UI()
      ui.deletebook(e.target.parentElement)
      ui.showAler("Book Deleted succesfully","alert-success")
    }
})

// Clear event
document.querySelector('.Clear').addEventListener('click',function(e){
    const ui=new UI()
    ui.clearevent()
    ui.clearAlert()
    ui.buttondisplay()
    ui.showAler("all Book cleared succesfully","alert-success")
   
})

