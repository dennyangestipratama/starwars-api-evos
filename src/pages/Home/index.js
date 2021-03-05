import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import { StarshipContext } from '@Context/StarshipContext'
import { images } from '@Utilities/Images'

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
      if (!starship.isLoading || starship.items.length === 0) {
         starshipContext.fetchStarship(find.keyword)
      }
   }, [starship.currentPage, find.searching, find.showReset]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <section className='home'>
         <div className='home-body'>
            <div className='home-body__title'>
               <h2>Starship</h2>
               <form onSubmit={(event) => search(event)}>
                  <input
                     type='search'
                     value={find.keyword}
                     placeholder='search'
                     autofocus
                     onChange={({ target: { value } }) => setFind((prevState) => ({ ...prevState, keyword: value }))}
                  />
                  <button type='submit'>find</button>
               </form>
               {!find.showReset ? null : (
                  <button
                     className='home-reset'
                     onClick={() => {
                        reset()
                        setFind((prevState) => ({ ...prevState, showReset: false }))
                     }}>
                     reset
                  </button>
               )}
            </div>
            <div className='home-wrapper'>
               <InfiniteScroll pageStart={1} loadMore={starshipContext.nextPage} hasMore={starship.isHasMore} loader='please wait...'>
                  {starship.items.map((item) => {
                     return (
                        <div
                           className='home-card'
                           onClick={() => {
                              localStorage.setItem('url', item.url)
                           }}>
                           {images
                              .filter((filter) => filter.name === item.name.replace(/\s/g, '-').toLowerCase())
                              .map((img) => (
                                 <img src={img.url} alt={img.name} />
                              ))}
                           <h3>{item.name}</h3>
                           <Link to={`/starship/${item.name.replace(/\s/g, '-').toLowerCase()}`}>
                              <div>
                                 <button>See detail</button>
                              </div>
                           </Link>
                        </div>
                     )
                  })}
               </InfiniteScroll>
            </div>
         </div>
      </section>
   )
}
