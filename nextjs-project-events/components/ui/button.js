import Link from 'next/link';
import classes from './button.module.css';

const Button = (props) => {
  const { link, children, onClick } = props;
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
