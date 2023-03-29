import {useState} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAws, faJava, faDocker} from "@fortawesome/free-brands-svg-icons";

export default function Home() {

    const [loaded, setLoaded] = useState(true);

    return (
        <div id="home" className="flex w-full h-screen flex-col md:flex-row gap-5 items-center justify-center text-white relative">
            <div className='md:w-3/6' data-aos="fade-right" data-aos-duration="1000" data-aos-offset="100">
                <div className="flex flex-col w-full mt-8">
                    <h1 className="text-xl text-gray-400">Our family!</h1>
                    <br/>
                    <p className="text-md font-light text-gray-400 ">
                        Hello!
                    </p>
                </div>
            </div>
        </div>
    )
}