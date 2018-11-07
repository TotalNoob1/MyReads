import React, { Component} from 'react'
import * as BooksAPI from './BooksAPI'

class BookList extends Component{
  render(){
    let selectedBooks = [];
    let anchor =this;

    function onChange(event) {
      if (anchor.props.dataBooks) {
        for (var f = 0; f < anchor.props.results.length; f++) {
          if (event.target.closest('li').classList[0] === anchor.props.results[f].id) {
            BooksAPI.update( anchor.props.results[f],event.target.value)
            anchor.props.results[f].shelf = event.target.value;
            anchor.props.dataBooks.push(anchor.props.results[f])
          }
        }
      }else {
      if(event.target.value ==='currentlyReading'){
        document.getElementById('currentlyReadingSection').appendChild(event.target.closest('li'));
        selectedBooks.push(event.target.closest('li'));
        for (var i = 0; i < anchor.props.bookList.length; i++) {
          if (anchor.props.bookList[i].id === event.target.closest('li').classList[0]) {
            anchor.props.bookList[i].shelf = 'currentlyReading';
            BooksAPI.update(anchor.props.bookList[i],event.target.value)


          }
        }

      } else if (event.target.value ==='wantToRead') {
        document.getElementById('wantToReadSection').appendChild(event.target.closest('li'));
        event.target.focus();
        for (var x = 0; x < anchor.props.bookList.length; x++) {
          if (anchor.props.bookList[x].id === event.target.closest('li').classList[0]) {
            anchor.props.bookList[x].shelf = 'wantToRead';
            BooksAPI.update(anchor.props.bookList[x],event.target.value)


          }
        }


      }else if (event.target.value ==='read'){
        document.getElementById('readSection').appendChild(event.target.closest('li'));
        event.target.focus();
        for (var y = 0; y < anchor.props.bookList.length; y++) {
          if (anchor.props.bookList[y].id === event.target.closest('li').classList[0]) {
            anchor.props.bookList[y].shelf = 'read';
            BooksAPI.update(anchor.props.bookList[y],event.target.value)


          }
        }

      }else if (event.target.value ==='none') {
        event.target.closest('li').remove(event.target.closest('li'));
        for (var z = 0; z < anchor.props.bookList.length; z++) {
          if (anchor.props.bookList[z].id === event.target.closest('li').classList[0]) {
            anchor.props.bookList[z].shelf = 'none';
            BooksAPI.update(anchor.props.bookList[z],'none')


          }
        }
      }
    }

    }



    for (var i = 0; i < this.props.bookList.length; i++) {
      if (this.props.section) {
        if (this.props.bookList[i].shelf === this.props.section){
          selectedBooks.push(this.props.bookList[i]);
        }
      }else {
        selectedBooks.push(this.props.bookList[i]);

      }

    }
        return(
            <div id ={this.props.id}>
            {selectedBooks.map((book)=>(
              <li className ={book.id} key ={book.id}>
                <div className="book">
                  <div className="book-top">
                  {book.backgroundImage?(
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.backgroundImage}")` }}></div>
                  ):(
                    <div>
                    {book.imageLinks?(
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}></div>
                    ):(
                      <div className="book-cover" style={{ width: 128, height: 193}}></div>
                    )}
                    </div>

                  )}
                    <div className="book-shelf-changer">
                    {book.shelf ? (
                      <select defaultValue ={book.shelf} onChange ={onChange} className = "options">
                        <option  value="move" disabled>Move to...</option>
                        <option  value="currentlyReading">Currently Reading</option>
                        <option  value="wantToRead">Want to Read</option>
                        <option  value="read">Read</option>
                        <option autoFocus value="none">None</option>
                      </select>
                    ):(
                      <select defaultValue ='none' onChange ={onChange} className = "options">
                        <option  value="move" disabled>Move to...</option>
                        <option  value="currentlyReading">Currently Reading</option>
                        <option  value="wantToRead">Want to Read</option>
                        <option  value="read">Read</option>
                        <option autoFocus value="none">None</option>
                      </select>

                    )}
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {Array.isArray(book) ?(
                    book.map((author) =>(
                        <div className = "book-authors">{book.author}</div>
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
