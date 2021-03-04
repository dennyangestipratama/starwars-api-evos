import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import { StarshipContext } from '@Context/StarshipContext'

export default function Home() {
   const starshipContext = useContext(StarshipContext)
   const starship = starshipContext.starship

   const [find, setFind] = useState({
      keyword: '',
      showReset: false,
      searching: false,
   })

   useEffect(() => {
      starshipContext.setStarship((prevState) => ({ ...prevState, isLoading: true, items: [] }))
      setFind((prevState) => ({ ...prevState, searching: false }))
      if (!starship.isLoading) {
         starshipContext.fetchStarship(find.keyword)
      }
   }, [starship.currentPage, find.searching, find.showReset])

   const search = (event) => {
      event.preventDefault()
      setFind((prevState) => ({ ...prevState, searching: true, showReset: true }))
      starshipContext.setStarship((prevState) => ({ ...prevState, currentPage: 1, items: [] }))
   }

   const reset = () => {
      setFind((prevState) => ({ ...prevState, keyword: '', searching: false }))
      starshipContext.setStarship((prevState) => ({ ...prevState, currentPage: 1, items: [] }))
   }

   return (
      <div>
         <form onSubmit={(event) => search(event)}>
            <input value={find.keyword} onChange={({ target: { value } }) => setFind((prevState) => ({ ...prevState, keyword: value }))} />
            <button type='submit'>search</button>
         </form>
         {!find.showReset ? null : (
            <button
               onClick={() => {
                  reset()
                  setFind((prevState) => ({ ...prevState, showReset: false }))
               }}>
               reset
            </button>
         )}
         <InfiniteScroll pageStart={1} loadMore={starshipContext.nextPage} hasMore={starship.isHasMore} loader='please wait...'>
            {starship.items.map((item) => {
               return (
                  <Link to={`/starship/${item.name.replace(/\s/g, '-').toLowerCase()}`}>
                     <div onClick={() => starshipContext.setSelectedStarship(item)}>
                        <h3>{item.name}</h3>
                        <p>{item.passengers}</p>
                        <p>{item.cargo_capacity}</p>
                        <p>{item.length}</p>
                     </div>
                  </Link>
               )
            })}
         </InfiniteScroll>
      </div>
   )
}
