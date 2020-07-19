import React from 'react';
import PropTypes from 'prop-types';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';
import LinkCard from './LinkCard';

const LinkCards = ({ linksToDisplay, availableGroups }) => {
  const rowHandlers = {
    removeLink,
    updateLink,
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
