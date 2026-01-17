import { Outlet, Link } from 'react-router-dom'
import { Footer } from './pages/Footer.jsx'
function App() {
  return (
    <>
    <div className='flex justify-between flex-col lg:flex-row max-w-7xl mx-auto lg:p-4 md:p-3 p-1'>
      <div className='flex gap-3 items-center justify-center'>
        <img className='w-16' src="/img/logo.png" alt="Logo zootique" />
        <span className='font-medium'>Zootique</span>
      </div>
      <nav className='flex gap-4 justify-center items-center'>
        <Link to="/" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Home</Link>
        <Link to="/login" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Login</Link>
        <Link to="/register" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Register</Link>
        <div className='w-fit h-fit bg-emerald-600 rounded-full p-2 hover:scale-105 transition duration-200'>
          <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M263.79-96Q234-96 213-117.21t-21-51Q192-198 213.21-219t51-21Q294-240 315-218.79t21 51Q336-138 314.79-117t-51 21Zm432 0Q666-96 645-117.21t-21-51Q624-198 645.21-219t51-21Q726-240 747-218.79t21 51Q768-138 746.79-117t-51 21ZM253-696l83 192h301l82-192H253Zm-31-72h570q14 0 20.5 11t1.5 23L702.63-476.14Q694-456 676.5-444T637-432H317l-42 72h493v72H276q-43 0-63.5-36.15-20.5-36.16.5-71.85l52-90-131-306H48v-72h133l41 96Zm114 264h301-301Z"/></svg></Link>
        </div>
      </nav>
    </div>

      {}
      <Outlet />
      <Footer />
    </>
    
  )
}

export default App