import logo from '../assets/tree-logo-white.svg'

export default function Navbar() {
    return (
        <div className='z-50 bg-dark-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36'>
            <div className="flex justify-between items-center text-white">
                <img src={logo} className="App-logo w-10 rounded-full" alt="logo" />
                <ul className="hidden md:flex">
                    <li className="p-4"><a href="/" className="hover:underline">Home</a></li>
                    <li className="p-4"><a href="/tree" className="hover:underline">Family tree</a></li>
                </ul>
            </div>
        </div>
    )
}