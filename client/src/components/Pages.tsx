import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../App';

const Pages = observer(() => {
  const { device } = useContext(Context);
  const totalPages = Math.ceil(device.totalCount / device.limit);
  const pages: number[] = new Array(totalPages)
    .fill(1)
    .map((item, i) => item + i);
  if (pages.length < 2) {
    return null;
  } else {
    return (
      <Pagination className="mt-5">
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === device.page}
            onClick={() => device.setPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  }
});

export default Pages;
