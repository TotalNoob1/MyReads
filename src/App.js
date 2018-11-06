import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './search.js'
import BookList from './book.js'
import {Link} from 'react-router-dom'
import { Route } from 'react-router-dom'
let bookList =[
  {
    "state":"currentlyReading",
    "title": "To Kill a Mockingbird",
    "id":"ToKillaMockingbird",
    "author":"Harper Lee",
    "backgroundImage":"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
  },
  {
    "state":"currentlyReading",
    "title": "Ender's Game",
    "id":"EnderGame",
    "author":"Orson Scott Card",
    "backgroundImage":"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
  },
  {
    "state":"wantToRead",
    "title": "1776",
    "id":"1776",
    "author":"David McCullough",
    "backgroundImage":"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
  },
  {
    "state":"wantToRead",
    "title":"Harry Potter and the Sorcerer's Stone",
    "id":"HarryPotterandtheSorcererStone",
    "author":"J.K. Rowling",
    "backgroundImage":"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
  },
  {
    "state":"Read",
    "title":"The Hobbit",
    "id":"TheHobbit",
    "author":"J.R.R. Tolkien",
    "backgroundImage":"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
  },
  {
    "state":"Read",
    "title":"Oh, the Places You'll Go",
    "id":"OhthePlacesYoullGo",
    "author":"Seuss",
    "backgroundImage":"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"

  },
  {
    "state":"Read",
    "title":"The Adventures of Tom Sawyer",
    "id":"TheAdventuresofTom Sawyer",
    "author":"Mark Twain",
    "backgroundImage":"http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
  }
];
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books:[],

    showSearchPage: false
  }
  componentDidMount(){
    BooksAPI.getAll().then((book)=>this.setState({books:book}))
  }

  render() {
    return (
      <div>

      <div className="app">
          <Route path = '/addABook' render = {() => (
            <Search dataBooks = {bookList}/>
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
                    <BookList id ="currentlyReadingSection" bookList = {bookList} section = 'currentlyReading'/>
                  </ol>
                </div>
              </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <BookList id ="wantToReadSection" bookList = {bookList} section = 'wantToRead'/>
                </ol>
              </div>
            </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookList id ="readSection" bookList = {bookList} section = 'Read'/>
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
