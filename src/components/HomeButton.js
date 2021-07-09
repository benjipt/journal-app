import React, { Component } from 'react'

export default class HomeButton extends Component {
    render() {
        return (
            <div>
                <h1 className="display-1"
                    onClick={ this.props.handleClickHome }>Journals</h1>
            </div>
        )
    }
}
