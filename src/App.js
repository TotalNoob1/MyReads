import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './search.js'
import BookList from './book.js'
import {Link} from 'react-router-dom'
import { Route } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books:[],
     ready:false,

    showSearchPage: false
  }
   componentDidMount(){
     let anchor =this;
    BooksAPI.getAll().then(function (book) {
      anchor.state.books = book
      anchor.setState({ready:true})
    })
  }

  render() {
    let anchor = this
    return (
      <div>

      <div className="app">
          <Route path = '/addABook' render = {() => (
            <Search dataBooks = {anchor.state.books}/>
          )}/>
          <Route path ='/' exact render={() => (

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {anchor.state.ready?
                    (
                      <BookList id ="currentlyReadingSection" bookList = {anchor.state.books} section = 'currentlyReading'/>
                    ):
                    (<div></div>)}
                  </ol>
                </div>
              </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {anchor.state.ready?
                  (
                    <BookList id ="wantToReadSection" bookList = {anchor.state.books} section = 'wantToRead'/>
                  ):
                  (<div></div>)}
                </ol>
              </div>
            </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        <BookList id ="readSection" bookList = {anchor.state.books} section = 'read'/>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}/>

            <div className="open-search">
              <Link to="/addABook">Add a book</Link>
            </div>
          </div>


      </div>
    )
  }
}

export default BooksApp
