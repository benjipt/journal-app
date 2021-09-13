import React, { useEffect } from 'react'
import JournalCard from './JournalCard'

export default function Journals(props) {

    const { getJournals, userID, journals, toggleShowJournalPage } = props

    useEffect(() => {
        getJournals(userID)
    }, [getJournals, userID])

    return (
        <div className="container px-4">
            { journals.map(journal => {
                return (
                    <JournalCard
                        key={ journal._id }
                        journal={ journal }
                        toggleShowJournalPage={ toggleShowJournalPage } />
                )
            }) }
        </div>
    )
}
