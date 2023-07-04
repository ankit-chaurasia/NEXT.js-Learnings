import Link from 'next/link';

const HomePage = () => {
    return <div>
        <h1>The Home page</h1>
        <ul>
            <li>
                <Link href="/portfolio">portfolio page</Link>
            </li>
            <li>
                <Link href="/clients">clients page</Link>
            </li>
        </ul>
    </div>
}

export default HomePage;