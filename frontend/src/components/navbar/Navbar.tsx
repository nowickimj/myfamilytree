import logo from '../../assets/tree-logo-white.svg'

export default function Navbar() {
    return (
        <div className='z-50 bg-dark-500 w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36'>
            <div className="flex justify-between items-center text-white">
                <img src={logo} className="App-logo w-10 rounded-full" alt="logo" />
                <ul className="hidden md:flex">
                    <li className="p-4"><a href="/" className="hover:underline">Drzewo</a></li>
                    <li className="p-4"><a href="/about" className="hover:underline">O projekcie</a></li>
                </ul>
            </div>
        </div>
    )
}