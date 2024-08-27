import Link from "next/link";

const Header = ()=>{
    return(
        <header>
            <div><Link href="/"><img src = "header.svg" alt = "header-img"/></Link></div>
            <nav>
                <ul>
                    <li><Link href="/user/register">Sign Up</Link></li>
                    <li><Link href="/user/login">Log in</Link></li>
                    <li><Link href="/item/create">Create a new item</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header