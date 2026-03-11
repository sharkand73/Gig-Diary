import React, { useEffect, useRef } from 'react'
import { Gig } from '../../models/Gig'
import GigItem from './GigItem'

interface Props {
    gigs: Gig[]
}

function GigList(props: Props) {
    const { gigs } = props
    const nextGigRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (nextGigRef.current) {
            nextGigRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    }, [gigs])

    return (
        <div className='h-100 overflow-auto px-3'>
            {gigs.map(g => (
                <div
                    key={g.id}
                    ref={g.isNextGig ? nextGigRef : null}
                >
                    <GigItem gig={g} />
                </div>
            ))}
        </div>
    )
}

export default GigList