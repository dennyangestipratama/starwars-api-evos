import { createContext, useState } from 'react'
import { BASE_URL } from '@Utilities/Variables'

export const StarshipContext = createContext()
export const StarshipContextConsumer = StarshipContext.Consumer

export default function StarshipContextProvider({ children }) {
   const [starship, setStarship] = useState({
      isLoading: false,
      isLoadingMore: false,
      isHasMore: false,
      items: [],
      currentPage: 1,
   })

   const [detail, setDetail] = useState({
      isLoading: false,
      data: null,
      url: '',
   })

   const fetchDetailStarship = (url) => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => {
            setDetail((prevState) => ({
               ...prevState,
               isLoading: false,
               data: data,
            }))
         })
   }

   const fetchStarship = (search) => {
      fetch(`starships?search=${search}&page=${starship.currentPage}`)
         .then((response) => response.json())
         .then((data) => {
            const results = data.results
            setStarship((prevState) => ({
               ...prevState,
               items: starship.items.concat(results),
               isLoading: false,
               isLoadingMore: false,
               isHasMore: !data.next ? false : true,
            }))
         })
   }

   const nextPage = () => {
      if (!starship.isLoading && !starship.isLoadingMore) {
         setStarship((prevState) => ({
            ...prevState,
            isLoadingMore: true,
            currentPage: prevState.currentPage + 1,
         }))
      }
   }

   return (
      <StarshipContext.Provider
         value={{
            starship,
            detail,
            setDetail,
            setStarship,
            fetchStarship,
            fetchDetailStarship,
            nextPage,
         }}>
         {children}
      </StarshipContext.Provider>
   )
}
