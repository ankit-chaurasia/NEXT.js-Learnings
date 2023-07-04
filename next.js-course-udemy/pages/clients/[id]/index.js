import { useRouter } from 'next/router';

const ClientsIdPage = () => {
    const router = useRouter();
    console.log("router.query ClientsIdPage", router.query);

    const loadProjectHandler = () => {
        // router.push('/clients/ankit/projectA');
        router.push({
            pathname: '/clients/[id]/[clientprojectid]',
            query: { id: 'ankit', clientprojectid: 'projectA' },
        });
    }

    return <div>
        <h1>The Clients ID page</h1>
        <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
}

export default ClientsIdPage;