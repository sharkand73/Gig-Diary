import React from 'react'
import { Gig } from '../../models/Gig'
import GigItem from './GigItem'

interface Props {
    gigs: Gig[]
}

function GigList(props: Props) {
    const { gigs } = props

    return (
        <div className='h-100 overflow-auto px-3'>
            {gigs.map(g => <GigItem gig={g} key={g.id} />)}
        </div>
    )
}

export default GigList
