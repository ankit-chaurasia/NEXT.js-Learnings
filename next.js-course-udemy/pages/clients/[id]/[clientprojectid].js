import { useRouter } from 'next/router';

const ClientsProjectIdPage = () => {
    const router = useRouter();
    console.log("router.query ClientsProjectIdPage", router.query);
    return <div>
        <h1>The Clients ProjectId page</h1>
    </div>
}

export default ClientsProjectIdPage;