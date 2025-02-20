import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'fundamental-react';
import { ReadableCreationTimestamp, PageHeader } from 'react-shared';
import { ExternalLink, Image } from './styled';

import { serviceClassTileTitles } from 'helpers/constants';
import { isStringValueEqualToTrue } from 'helpers';
import { Token } from 'fundamental-react';

const ServiceClassInfo = ({ serviceClass, labels, planSelector }) => {
  const extData = serviceClass.spec.externalMetadata || {};

  const extractLabels = () => {
    const extractedLabels = [];
    if (labels) {
      if (labels['connected-app'])
        extractedLabels.push(labels['connected-app']);
      if (isStringValueEqualToTrue(labels.local)) extractedLabels.push('local');
      if (isStringValueEqualToTrue(labels.showcase))
        extractedLabels.push('showcase');
    }

    return extractedLabels;
  };

  const tagsCombined = [...(serviceClass.spec.tags || []), ...extractLabels()];

  return (
    <>
      <PageHeader.Column
        image={
          extData.imageUrl ? (
            <Image size="l" photo={extData.imageUrl} />
          ) : (
            <Icon glyph="crm-service-manager" aria-label="ServiceClass icon" />
          )
        }
        title={serviceClassTileTitles.creator}
      >
        {extData.providerDisplayName}
      </PageHeader.Column>

      <PageHeader.Column title={serviceClassTileTitles.lastUpdate}>
        <ReadableCreationTimestamp
          timestamp={serviceClass.metadata.creationTimestamp}
        />
      </PageHeader.Column>
      {extData.documentationUrl && (
        <PageHeader.Column
          columnSpan={(extData.supportUrl = {})}
          title={serviceClassTileTitles.documentation}
        >
          <ExternalLink
            href={extData.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </ExternalLink>
        </PageHeader.Column>
      )}

      {extData.supportUrl && (
        <PageHeader.Column title={serviceClassTileTitles.support}>
          <ExternalLink
            href={extData.supportUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </ExternalLink>
        </PageHeader.Column>
      )}

      <PageHeader.Column
        style={{ gridColumn: '1 / span 3' }}
        title={serviceClassTileTitles.description}
      >
        <p data-e2e-id="service-description">{serviceClass.spec.description}</p>
      </PageHeader.Column>

      {tagsCombined && tagsCombined.length > 0 && (
        <PageHeader.Column
          style={{ gridColumn: '4 / span 5' }}
          title={serviceClassTileTitles.tags}
        >
          {tagsCombined.map(t => (
            <Token
              style={{ marginRight: '4px', marginBottom: '4px' }}
              readOnly
              key={t}
              buttonLabel=""
            >
              {t}
            </Token>
          ))}
        </PageHeader.Column>
      )}
    </>
  );
};

ServiceClassInfo.propTypes = {
  serviceClass: PropTypes.object.isRequired,
  labels: PropTypes.object,
  planSelector: PropTypes.node,
};

export default ServiceClassInfo;
