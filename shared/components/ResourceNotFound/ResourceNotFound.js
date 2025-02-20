import React from 'react';
import PropTypes from 'prop-types';
import LuigiClient from '@luigi-project/client';
import { Breadcrumb, LayoutPanel } from 'fundamental-react';

export const ResourceNotFound = ({
  resource,
  breadcrumb,
  path,
  fromClosestContext = true,
}) => {
  const navigate = () => {
    if (fromClosestContext) {
      LuigiClient.linkManager()
        .fromClosestContext()
        .navigate(path);
    } else {
      LuigiClient.linkManager().navigate(path);
    }
  };

  return (
    <>
      <header className="fd-page__header fd-page__header--columns fd-has-background-color-background-2">
        <section className="fd-section">
          <div className="fd-action-bar">
            <div className="fd-action-bar__header">
              <Breadcrumb>
                <Breadcrumb.Item name={breadcrumb} url="#" onClick={navigate} />
                <Breadcrumb.Item />
              </Breadcrumb>
            </div>
          </div>
        </section>
      </header>
      <LayoutPanel className="fd-has-margin-large">
        <LayoutPanel.Body className="fd-has-text-align-center">
          <span className="fd-has-type-4">Such {resource} doesn't exists.</span>
        </LayoutPanel.Body>
      </LayoutPanel>
    </>
  );
};

ResourceNotFound.propTypes = {
  resource: PropTypes.string.isRequired,
  breadcrumb: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  fromClosestContext: PropTypes.bool,
};
