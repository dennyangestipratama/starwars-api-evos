import { useEffect, useContext, Fragment } from 'react'
import { StarshipContext } from '@Context/StarshipContext'
import { images } from '@Utilities/Images'
import { thousandSeparator } from '@Utilities/Func'

export default function Detail() {
   const starshipContext = useContext(StarshipContext)
   const starship = starshipContext.detail

   useEffect(() => {
      starshipContext.setDetail((prevState) => ({ ...prevState, isLoading: true }))
      starshipContext.setStarship((prevState) => ({ ...prevState, isLoading: true, items: [], currentPage: 1 }))
      if (!starship.isLoading) {
         starshipContext.fetchDetailStarship(localStorage.getItem('url'))
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <section className='detail'>
         <div className='detail-card'>
            <Fragment>
               {images
                  .filter((filter) => filter.name === starship.data?.name.replace(/\s/g, '-').toLowerCase())
                  .map((img) => (
                     <img className='card-image' src={img.url} alt={img.name} />
                  ))}
               {starship.isLoading ? null : (
                  <div className='card-info'>
                     <h3>{starship.data?.name}</h3>
                     <p>Model: {starship.data?.model}</p>
                     <p>Manufacturer: {starship.data?.manufacturer}</p>
                     <p>Class: {starship.data?.starship_class}</p>
                     <p>Cost: {thousandSeparator(starship.data?.cost_in_credits)} credits</p>
                     <p>Speed: {thousandSeparator(starship.data?.max_atmosphering_speed)} km/h</p>
                     <p>Hyperdrive Rating: {starship.data?.hyperdrive_rating}</p>
                     <p>MGLT: {thousandSeparator(starship.data?.MGLT)}</p>
                     <p>Length: {thousandSeparator(starship.data?.length)} meter</p>
                     <p>Cargo Capacity: {thousandSeparator(starship.data?.cargo_capacity)} metric tons</p>
                     <p>Crew: {thousandSeparator(starship.data?.crew)}</p>
                     <p>Passengers: {thousandSeparator(starship.data?.passengers)}</p>
                  </div>
               )}
            </Fragment>
         </div>
      </section>
   )
}
