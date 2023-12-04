import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getAllEvents } from '../../helpers/api-util';

const EventDetailsPage = (props) => {
	const event = props.selectedEvent;

	if (!event) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
		);
	}
	const { title, date, location, image, description } = event;

	return (
		<>
			<EventSummary title={title} />
			<EventLogistics
				date={date}
				address={location}
				image={image}
				imageAlt={title}
			/>
			<EventContent>
				<p>{description}</p>
			</EventContent>
		</>
	);
};
export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);
	return {
		props: { selectedEvent: event },
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getAllEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));
	return { paths, fallback: 'blocking' };
}

export default EventDetailsPage;
