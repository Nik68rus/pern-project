import { useEffect, useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import classes from './Rating.module.scss';
import cx from 'classnames';
import { getMyRate, postRate } from '../http/rateAPI';
import { Context } from '../App';
import { handleError } from '../helpers';
import { toast } from 'react-toastify';

interface Props {
  onChange: (rating: number) => void;
}

const Rating = ({ onChange }: Props) => {
  const [mark, setMark] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { device } = useContext(Context);

  useEffect(() => {
    if (device.selectedDevice) {
      getMyRate(device.selectedDevice)
        .then((data) => setMark(data))
        .catch((err) => handleError(err));
    }
  }, [device.selectedDevice]);

  const rates = [1, 2, 3, 4, 5];

  const handleMark = async (rate: number) => {
    setMark(rate);
    if (!device.selectedDevice) {
      return handleError('Что-то пошло не так! Попробуйте позже!');
    }
    try {
      const response = await postRate(device.selectedDevice, rate);
      onChange(response.rating);
      toast.success('Ваш голос учтен!');
    } catch (err) {
      handleError(err);
    }
  };

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
          <label htmlFor={`rate${rate}`}>
            <FaStar />
          </label>
          <input
            type="radio"
            className="visually-hidden"
            value={rate}
            name="rate"
            id={`rate${rate}`}
            checked={mark === rate}
            onChange={handleMark.bind(this, rate)}
          />
        </div>
      ))}
    </div>
  );
};

export default Rating;
