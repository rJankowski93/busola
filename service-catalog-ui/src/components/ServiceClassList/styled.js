import styled from 'styled-components';
import { media } from '@kyma-project/react-components';

export const ServiceClassListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  align-items: flex-start;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  ${props => (props.phoneRows ? media.phone`flex-flow: column nowrap;` : '')};
`;

export const CardsWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, auto));
  grid-gap: 1.3rem;
  width: 100%;
  padding: 1.3rem 30px 30px 30px;
`;

export const ServiceClassDescription = styled.div`
  color: #74777a;
  font-size: 16px;
  text-align: left;
  padding: 16px 30px 0;
`;

export const StatusesList = styled.ul`
  margin: 0 0 0 10px;
  align-items: center;
  display: grid;
  grid-gap: 3px;
`;

export const StatusWrapper = styled.li`
  list-style-type: none;
  grid-row: 1;
  &:first-child {
    margin-left: 0;
  }
  .fd-badge {
    padding: 1px 3px;
  }

  .fd-info-label {
    font-size: var(--sapFontSmallSize, 0.875rem);
  }
`;

export const EmptyList = styled.div`
  width: 100%;
  font-family: '72';
  text-align: center;
  font-size: 20px;
  color: #32363a;
  margin: 50px 0;
`;
