import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../App';

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pages = [1, 2, 3, 4, 5];

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item key={page}>{page}</Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
