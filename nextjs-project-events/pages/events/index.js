import { useRouter } from 'next/router';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

const AllEventsPage = () => {
  const events = getAllEvents();
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

export default AllEventsPage;
