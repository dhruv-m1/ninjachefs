import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { UserButton } from "@clerk/clerk-react";

import styles from './header.module.css';

export default function Header() {

    return (
        <header>

            <Link to="../"> <img  id={styles.logo} src={logo} alt="Ninja Chefs Logo"/></Link>

            <section className={styles.userButton}>
                <UserButton></UserButton>
            </section>
            
            
        </header>
    );
  }