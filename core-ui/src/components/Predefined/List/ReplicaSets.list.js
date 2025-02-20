import React from 'react';
import { StatusBadge } from 'react-shared';

const getImages = replicaSet => {
  const images =
    replicaSet.spec.template.spec.containers?.map(
      container => container.image,
    ) || [];
  return images;
};

const isStatusOk = replicaSet => {
  return replicaSet.status.readyReplicas === replicaSet.status.replicas;
};

const getStatus = replicaSet => {
  return isStatusOk(replicaSet) ? 'running' : 'error';
};

const getStatusType = replicaSet => {
  return isStatusOk(replicaSet) ? 'success' : 'error';
};

export const ReplicaSetsList = DefaultRenderer => ({ ...otherParams }) => {
  const customColumns = [
    {
      header: 'Images',
      value: replicaSet => {
        const images = getImages(replicaSet);
        const imagesString = images.join(', ');
        return imagesString;
      },
    },
    {
      header: 'Status',
      value: replicaSet => {
        const status = getStatus(replicaSet);
        const statusType = getStatusType(replicaSet);
        return <StatusBadge type={statusType}>{status}</StatusBadge>;
      },
    },
  ];

  return <DefaultRenderer customColumns={customColumns} {...otherParams} />;
};
