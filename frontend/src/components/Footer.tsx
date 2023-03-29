import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLastfmSquare, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
    return (
        <div className="flex grid justify-items-center content-center mt-4 bg-dark-200 rounded-md text-white px-8 py-4">
            <div className="mt-4 bg-dark-200 rounded-md text-white px-8 py-4">
                <ul className='flex mt-2 gap-4 items-center'>
                    <li>
                        <a href='https://github.com/megaszynszyl' rel="noreferrer" target="_blank"><FontAwesomeIcon size='2xl' icon={faGithub}/></a>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/in/marcin-nowicki-735b75159/' rel="noreferrer" target="_blank"><FontAwesomeIcon size='2xl' icon={faLinkedinIn}/></a>
                    </li>
                </ul>
            </div>
            <p className="text-sm font-light text-center">Copyright © 2023 mnowicki.net</p>
        </div>
    )
}