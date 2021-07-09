import React, { Component } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


export default class SearchBar extends Component {
    render() {
        return (
            <div className="mt-2 mb-4 row justify-content-center">
                <div className="col-6">
                    <ReactSearchAutocomplete 
                        items={ this.props.items }
                        fuseOptions={{ keys: ['title', 'body'] }}
                        resultStringKeyName='title'
                        styling={{
                            zIndex: 1
                        }} 
                        onSelect={ this.props.onSelect } />
                </div>
            </div>
        )
    }
}
