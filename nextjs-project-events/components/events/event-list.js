import EventItem from './event-item';
import classes from './event-list.module.css';

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map(({ title, image, date, location, id }) => (
        <EventItem
          key={id}
          title={title}
          image={image}
          date={date}
          location={location}
          id={id}
        />
      ))}
    </ul>
  );
};

export default EventList;
