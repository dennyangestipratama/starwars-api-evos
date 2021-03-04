import { Link } from 'react-router-dom'

export default function NotFound() {
   return (
      <div>
         <p>Oops.. I think you are lost</p>
         <Link to='/'>
            <button>Back to Home</button>
         </Link>
      </div>
   )
}
