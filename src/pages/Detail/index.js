import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { StarshipContext } from '@Context/StarshipContext'

export default function Detail() {
   const starshipContext = useContext(StarshipContext)
   const starship = starshipContext.detail

   useEffect(() => {
      starshipContext.setDetail(prevState => ({ ...prevState, isLoading: true }))
      if (!starship.isLoading) {
         starshipContext.fetchDetailStarship(localStorage.getItem('url'))
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div>
         <Link to='/'>
            <button>back</button>
         </Link>
         {starship.isLoading ? null :
            <div>
               <h3>{starship.data?.name}</h3>
               <p>{starship.data?.passengers}</p>
               <p>{starship.data?.cargo_capacity}</p>
               <p>{starship.data?.length}</p>
            </div>
         }
      </div>
   )
}
