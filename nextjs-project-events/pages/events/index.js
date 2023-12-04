import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

const AllEventsPage = (props) => {
	const { events } = props;
	const router = useRouter();

	const onSearch = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<>
			<EventSearch onSearch={onSearch} />
			<EventList items={events} />
		</>
	);
};

export async function getStaticProps() {
	const events = await getAllEvents();
	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}

export default AllEventsPage;
