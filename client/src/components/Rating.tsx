import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import classes from './Rating.module.scss';
import cx from 'classnames';

const Rating = () => {
  const [mark, setMark] = useState(0);
  const [hovered, setHovered] = useState(0);

  const rates = [1, 2, 3, 4, 5];

  return (
    <div className={classes.rating} onMouseLeave={() => setHovered(0)}>
      {rates.map((rate) => (
        <div
          key={rate}
          className={cx(classes.star, {
            [classes.fill]: mark > 0 ? rate <= mark : rate <= hovered,
          })}
          onMouseOver={() => setHovered(mark > 0 ? mark : rate)}
        >
          <label htmlFor={`rate${rate}`} onClick={() => setMark(rate)}>
            <FaStar />
          </label>
          <input
            type="radio"
            className="visually-hidden"
            value={rate}
            name="rate"
            id={`rate${rate}`}
            checked={mark === rate}
          />
        </div>
      ))}
    </div>
  );
};

export default Rating;
