import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

// 3rd party component renders a warning in console when returns autocomplete results: "Encountered two children with the same key", need to investigate further or find alternative component

export default function SearchBar(props) {

    const { items, onSelect } = props

    return (
        <div className="mt-2 mb-4 row justify-content-center">
            <div className="col-6">
                <ReactSearchAutocomplete 
                    items={ items }
                    fuseOptions={{ keys: ['title', 'body'] }}
                    resultStringKeyName='title'
                    styling={{
                        zIndex: 1
                    }} 
                    onSelect={ onSelect } />
            </div>
        </div>
    )
}
