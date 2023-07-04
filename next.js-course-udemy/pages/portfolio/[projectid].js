import { useRouter } from 'next/router';

const Portfolio = () => {
    const router = useRouter();
    console.log('router.pathname', router.pathname);
    console.log('router.query', router.query)
    return <div>
        <h1>The Portfolio with dynamic value: {router.query.projectid}</h1>
    </div>
}

export default Portfolio;