import React from 'react';
import PropTypes from 'prop-types';
import LinkKanbanCard from './LinkKanbanCard';

const style = {
  listStyle: {
    backgroundColor: 'rgba(180, 210, 220,0.2)',
    minHeight: '90vh',
    width: '30%',
  },
};

const LinkKanbanColumn = ({
  handlers,
  rows,
  statusName,
  rowHandlers,
  availableGroups,
  setLink,
}) => {
  const {
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragOver,

    handleDragStart,
    handleDragEnd,
  } = handlers;

  const dragHandlers = {
    handleDragStart,
    handleDragEnd,
  };

  return (
    <div
      id={statusName}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={style.listStyle}
    >
      <p
        style={{
          textAlign: 'center',
          padding: 5,
          backgroundColor: '#2d3748',
          color: '#eee',
          textTransform: 'uppercase',
        }}
      >
        {statusName}
      </p>
      {rows.map((link) => {
        return (
          <LinkKanbanCard
            availableGroups={availableGroups}
            setLink={setLink}
            rowHandlers={rowHandlers}
            {...dragHandlers}
            {...link}
          />
        );
      })}
    </div>
  );
};

LinkKanbanColumn.propTypes = {};

export default LinkKanbanColumn;
