import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { STATUSES } from '../../constants';
import { updateLink, removeLink } from '../../firebase/firebaseCRUD';
import KanbanColumn from './KanbanColumn';

const style = {
  listContainer: { display: 'flex', justifyContent: 'space-around' },
};

const LinksKanbanBoard = (props) => {
  const { linksToDisplay, setLinkToEdit, availableGroups } = props;
  const [draggedEl, setDraggedEl] = useState(null);
  // I had to implement handlers here cause we got here state with setters when I refactor it to context probably
  // they'll go to children where they are used
  const handleDragStart = (e) => {
    const { target } = e;
    setDraggedEl(target.id);
    setTimeout(() => {
      target.style.display = 'none';
    });
  };

  const handleDragEnd = (e) => {
    const { target } = e;
    setDraggedEl(null);
    setTimeout(() => {
      target.style.display = '';
    });
  };

  const handleDrop = (e) => {
    const test1 = STATUSES.includes(e.currentTarget.id);
    // todo: change this name
    if (test1) {
      const statusColumn = e.currentTarget.id;

      linksToDisplay.forEach((link) => {
        if (link.title === draggedEl) {
          updateLink(link.id, { ...link, status: statusColumn });
        }
      });
    }
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <div style={style.listContainer}>
        {STATUSES.map((status) => (
          <KanbanColumn
            handlers={{
              handleDrop,
              handleDragStart,
              handleDragEnd,
              removeLink,
              updateLink,
            }}
            key={status}
            setLinkToEdit={setLinkToEdit} // it will be move to action ??
            availableGroups={availableGroups}
            columnName={status}
            rows={linksToDisplay.filter((link) => link.status === status)}
          />
        ))}
      </div>
    </div>
  );
};

LinksKanbanBoard.propTypes = {
  linksToDisplay: PropTypes.arrayOf(PropTypes.object),
  setLinkToEdit: PropTypes.func.isRequired,
  availableGroups: PropTypes.arrayOf(PropTypes.object),
};

LinksKanbanBoard.defaultProps = {
  linksToDisplay: [],
  availableGroups: [],
};

export default LinksKanbanBoard;
