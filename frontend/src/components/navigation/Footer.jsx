import { Link } from 'react-router-dom';
import logo from '../../assets/footer_dhruv_logo.svg';


export default function Footer() {

    return (
        <footer className="h-28 md:h-24 flex items-center justify-center flex-col gap-2 md:justify-start md:flex-row my-6">

            <Link to="https://dhruv.tech"> <img  className="h-12 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all ease-in-out duration-500" src={logo} alt="Dhruv 'D' Shaped Logo"/></Link>

            <span className="h-6 w-0.5 bg-gray-400 hidden md:block" aria-hidden="true"></span>

            <p className='text-xs font-medium font-poppins text-gray-600 text-center md:text-left'>

                <span className='font-semibold'>
                    © {new Date().getFullYear()} Dhruv Malik. All Rights Reserved. <br/>
                </span>

                Built with React, Node, Clerk, MongoDB & OpenAI SDK

                (<a href="https://github.com/dhruv-tech/ninjachefs" className='underline' target="_blank" rel="noopener noreferrer"> 
                    View Source
                </a>)
                <br/>

                Thanks for visiting!

            </p>
            
        </footer>
    );
  }