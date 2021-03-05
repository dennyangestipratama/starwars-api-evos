import Navbar from '@Layout/Navbar'
import Footer from '@Layout/Footer'

import DarthVader from '@Logo/darth-vader.png'
import StormTrooper from '@Logo/storm-trooper.png'

export default function Layout({ children }) {
   return (
      <section className='layout'>
         <Navbar />
         <div className='layout-background background-right'>
            <img src={DarthVader} alt='darth vader' />
         </div>
         <div className='layout-background background-left'>
            <img src={StormTrooper} alt='storm trooper' />
         </div>
         {children}
         <Footer />
      </section>
   )
}
