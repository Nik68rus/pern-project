import React from 'react';
import { useParams } from 'react-router-dom';

function DevicePage() {
  const params = useParams();
  console.log(params);

  return <div>DevicePage - {params.deviceId}</div>;
}

export default DevicePage;
