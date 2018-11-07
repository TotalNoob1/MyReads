import * as BooksAPI from './BooksAPI'
import React, { Component} from 'react'
import BookList from './book.js'
import {Link} from 'react-router-dom'
let results = []

class Search extends Component {
  state= {
    showSearchresults:false,
    noresults:false
  }

  render() {
    let anchor = this;
    function inputChange(event){
      if (event.target.value==='') {
        anchor.setState({showSearchresults:false})

      }
      if(!event.target.value){
      return
      }else {
        BooksAPI.search(event.target.value).then(function (value) {
          if (!value.length) {
            results = 'error'
            anchor.setState({noresults:true})
          }else {
            results = value;
            for (var i = 0; i < value.length; i++) {
              for (var x = 0; x < anchor.props.dataBooks.length; x++) {
                if (value[i].id === anchor.props.dataBooks[x].id) {
                  value[i].shelf = anchor.props.dataBooks[x].shelf

                }
              }
            }
            anchor.setState({showSearchresults:true})
            anchor.setState({noresults:false})

          }

        }).catch(function () {
          results = 'error';
          anchor.setState({noresults:true})
        })
        if (results ==='error') {
          results = []
        }else {
          anchor.setState({showSearchresults:true})
        }
      }
      if (event.target.value ==='') {
        anchor.setState({noresults:true})

      }
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to ='/' className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onInput={inputChange} placeholder="Search by title or author"/>


          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.showSearchresults ? (
              <div>
              {this.state.noresults ?(
                <p>No results found</p>

              ):(

                <BookList dataBooks ={this.props.dataBooks} results ={results} bookList= {results} />
              )}
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
