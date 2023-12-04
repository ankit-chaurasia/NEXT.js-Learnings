import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = (props) => {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();
	const filterData = router.query.slug;
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error, isLoading } = useSWR(
		'https://nextjs-learnings-default-rtdb.firebaseio.com/events.json',
		fetcher
	);
	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}
			setLoadedEvents(events);
		}
	}, [data, isLoading]);

	if (isLoading || !loadedEvents) {
		return <p className='center'>Loading...</p>;
	}

	const [filteredYear, filteredMonth] = filterData;
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid Filter. Please adjust your values</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show all events</Button>
				</div>
			</>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	// const filteredEvents = props.events;
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the chosen filter</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show all events</Button>
				</div>
			</>
		);
	}
	// const { year, month } = props.date;
	// const date = new Date(year, month - 1);
	const date = new Date(numYear, numMonth - 1);
	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

// export async function getServerSideProps(context) {
// 	const { params } = context;
// 	const filterData = params.slug;
// 	const [year, month] = filterData;
// 	const numYear = +year;
// 	const numMonth = +month;
// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2030 ||
// 		numYear < 2021 ||
// 		numMonth < 1 ||
// 		numMonth > 12
// 	) {
// 		return {
// 			props: {
// 				hasError: true,
// 			},
// 			// redirect: {
// 			//   destination: '/error'
// 			// }
// 		};
// 	}
// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	});
// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth,
// 			},
// 		},
// 	};
// }

export default FilteredEventsPage;
