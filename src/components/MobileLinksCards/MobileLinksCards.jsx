import React from 'react';

import PropTypes from 'prop-types';
import ScrollUpButton from 'react-scroll-up-button';

import { removeLink, updateLink } from '../../firebase/firebaseCRUD';
import LinkCard from './LinkCard';

const MobileLinksCards = ({
  linksToDisplay,
  availableGroups,
  setLink,
  handleShowForm,
  handleHideForm,
}) => {
  const rowHandlers = {
    removeLink,
    updateLink,
    setLink,
    handleShowForm,
    handleHideForm,
  };
  return (
    <>
      {linksToDisplay.map((link) => (
        <LinkCard
          availableGroups={availableGroups}
          rowHandlers={rowHandlers}
          key={link.id}
          link={link}
        />
      ))}
      <ScrollUpButton />
    </>
  );
};

MobileLinksCards.propTypes = {
  linksToDisplay: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      group: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  setLink: PropTypes.func.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  handleHideForm: PropTypes.func.isRequired,
};

MobileLinksCards.defaultProps = {
  linksToDisplay: [],
  availableGroups: [],
};

export default MobileLinksCards;
