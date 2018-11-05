import React, { Component} from 'react'


class BookList extends Component{
  render(){
    let selectedBooks = [];
    let anchor =this;

    function onChange(event) {
      if(event.target.value ==='currentlyReading'){
        document.getElementById('currentlyReadingSection').appendChild(event.target.closest('li'));
        selectedBooks.push(event.target.closest('li'));
        for (var i = 0; i < anchor.props.bookList.length; i++) {
          if (anchor.props.bookList[i].class === event.target.closest('li').classList[0]) {
            anchor.props.bookList[i].state = 'currentlyReading';


          }
        }

      } else if (event.target.value ==='wantToRead') {
        document.getElementById('wantToReadSection').appendChild(event.target.closest('li'));
        event.target.focus();
        for (var x = 0; x < anchor.props.bookList.length; x++) {
          if (anchor.props.bookList[x].class === event.target.closest('li').classList[0]) {
            anchor.props.bookList[x].state = 'wantToRead';


          }
        }


      }else if (event.target.value ==='read'){
        document.getElementById('readSection').appendChild(event.target.closest('li'));
        event.target.focus();
        event.target.focus();
        for (var y = 0; y < anchor.props.bookList.length; y++) {
          if (anchor.props.bookList[y].class === event.target.closest('li').classList[0]) {
            anchor.props.bookList[y].state = 'read';


          }
        }

      }else if (event.target.value ==='none') {
        event.target.closest('li').remove(event.target.closest('li'));
        for (var z = 0; i < anchor.props.bookList.length; z++) {
          if (anchor.props.bookList[z].class === event.target.closest('li').classList[0]) {
            anchor.props.bookList[z].state = 'none';


          }
        }
      }

    }



    for (var i = 0; i < this.props.bookList.length; i++) {
      if (this.props.section) {
        if (this.props.bookList[i].state === this.props.section){
          selectedBooks.push(this.props.bookList[i]);

        }
      }else {
        selectedBooks.push(this.props.bookList[i]);

      }

    }
        return(
            <div id ={this.props.id}>
            {selectedBooks.map((book)=>(
              <li className ={book.title} key ={book.id}>
                <div className="book">
                  <div className="book-top">
                  {book.backgroundImage?(
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.backgroundImage}")` }}></div>
                  ):(
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}></div>

                  )}
                    <div className="book-shelf-changer">
                    {book.state ? (
                      <select defaultValue ={book.state} onChange ={onChange} className = "options">
                        <option  value="move" disabled>Move to...</option>
                        <option  value="currentlyReading">Currently Reading</option>
                        <option  value="wantToRead">Want to Read</option>
                        <option  value="Read">Read</option>
                        <option autoFocus value="none">None</option>
                      </select>
                    ):(
                      <select defaultValue ='none' onChange ={onChange} className = "options">
                        <option  value="move" disabled>Move to...</option>
                        <option  value="currentlyReading">Currently Reading</option>
                        <option  value="wantToRead">Want to Read</option>
                        <option  value="Read">Read</option>
                        <option autoFocus value="none">None</option>
                      </select>

                    )}
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {Array.isArray(book) ?(
                    book.map((author) =>(
                        <div className = "book-authors">author</div>
                      ))

                  ):(
                    <div className="book-authors">{book.author}</div>
                  )}
                </div>
              </li>
              ))}
            </div>

          )
    }
  }





export default BookList
