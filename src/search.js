import * as BooksAPI from './BooksAPI'
import React, { Component} from 'react'
import BookList from './book.js'

let results = []

class Search extends Component {
  state= {
    showSearchresults:false
  }

  inputChange(event){
    if(event.target.value===' ' || !event.target.value|| event.target.value ===''){
      return
    }else {
      BooksAPI.search(event.target.value).then(function (value) {
        if (!value.length) {
          results = 'error'
        }else {
          results = value;
        }

      }).catch(function () {
          results = 'error';
      })
      if (results ==='error') {
      }else {
        this.setState({showSearchresults:true})
      }
    }
  }
  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" >Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={this.inputChange.bind(this)} placeholder="Search by title or author"/>


          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.showSearchresults ? (
            <div>
              <BookList bookList= {results} />
            </div>
            ):(
              <p>Please enter a valid response</p>
            )}

          </ol>
        </div>
      </div>
    )

  }
}
export default Search
