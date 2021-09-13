import React from 'react'

export default function HomeButton(props) {

    const { handleClickHome } = props

    return (
        <div>
            <h1 className="display-1"
                onClick={ handleClickHome }>Journals</h1>
        </div>
    )
}
