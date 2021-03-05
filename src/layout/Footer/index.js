import Star from '@Logo/star.png'
import Wars from '@Logo/wars.png'

export default function Footer() {
   return (
      <footer className='footer'>
         <div className='footer-info'>
            <img src={Star} alt='star wars' />
            <h1 className='footer-title'>Denny Angesti Pratama</h1>
            <img src={Wars} alt='star wars' />
         </div>
      </footer>
   )
}
