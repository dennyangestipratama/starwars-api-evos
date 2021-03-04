import { useEffect, useContext } from 'react'
import { StarshipContext } from '@Context/StarshipContext'

export default function Detail() {
   const starshipContext = useContext(StarshipContext)

   useEffect(() => {
      starshipContext.fetchDetailStarship(starshipContext.selectedStarship.url)
   }, [])

   return <div>Detail</div>
}
