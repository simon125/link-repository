import React from 'react';
import PropTypes from 'prop-types';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';
import LinkCard from './LinkCard';

const LinkCards = ({
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
    </>
  );
};

LinkCards.propTypes = {};

export default LinkCards;
