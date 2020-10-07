/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import KanbanCard from './KanbanCard';

const style = {
  listStyle: {
    backgroundColor: 'rgba(180, 210, 220,0.2)',
    minHeight: '90vh',
    width: '30%',
  },
  columnHeader: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#2d3748',
    color: '#eee',
    textTransform: 'uppercase',
  },
};

const KanbanColumn = ({ handlers, rows, columnName, availableGroups, setLinkToEdit }) => {
  const { handleDrop, handleDragStart, handleDragEnd, removeLink, updateLink } = handlers;

  const dragHandlers = {
    handleDragStart,
    handleDragEnd,
  };

  const handleDragEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      id={columnName}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={style.listStyle}
    >
      <p style={style.columnHeader}>{columnName}</p>
      {rows.map((link) => {
        return (
          <KanbanCard
            key={link.id}
            availableGroups={availableGroups}
            setLinkToEdit={setLinkToEdit}
            removeLink={removeLink}
            updateLink={updateLink}
            {...dragHandlers}
            {...link}
          />
        );
      })}
    </div>
  );
};

KanbanColumn.propTypes = {
  handlers: PropTypes.shape({
    handleDrop: PropTypes.func.isRequired,
    handleDragStart: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    updateLink: PropTypes.func.isRequired,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  columnName: PropTypes.string,
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  setLinkToEdit: PropTypes.func.isRequired,
};

KanbanColumn.defaultProps = {
  rows: [],
  columnName: '',
  availableGroups: [],
};

export default KanbanColumn;
