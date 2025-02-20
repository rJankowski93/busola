import React from 'react';
import { LayoutPanel } from 'fundamental-react';

import './RoleBindings.scss';

export const RoleBindings = resource => (
  <>
    <div className="fd-has-margin-m">
      <LayoutPanel key={`roleRef`}>
        <LayoutPanel.Header>
          <LayoutPanel.Head title="Role" />
        </LayoutPanel.Header>
        <LayoutPanel.Body>
          <div className={'bindings-grid'}>
            <div className="fd-has-color-status-4">Kind</div>
            <div>{resource.roleRef?.kind}</div>
            <div className="fd-has-color-status-4">Name</div>
            <div>{resource.roleRef?.name}</div>
          </div>
        </LayoutPanel.Body>
      </LayoutPanel>
    </div>
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
      className="fd-has-margin-m"
    >
      {resource?.subjects?.map((subject, index) => (
        <LayoutPanel key={`subject-${index}`}>
          <LayoutPanel.Header>
            <LayoutPanel.Head title="Subject" />
          </LayoutPanel.Header>
          <LayoutPanel.Body>
            <div className={'bindings-grid'}>
              <div className="fd-has-color-status-4">Kind</div>
              <div>{subject.kind}</div>
              <div className="fd-has-color-status-4">Name</div>
              <div>{subject.name}</div>
            </div>
          </LayoutPanel.Body>
        </LayoutPanel>
      ))}
    </div>
  </>
);
