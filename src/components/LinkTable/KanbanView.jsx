import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { STATUSES } from '../../constants';
import LinkKanbanColumn from './LinkKanbanColumn';

const style = {};

const KanbanView = (props) => {
  const { linksToDisplay, updateLink, setLinkToEdit, availableGroups } = props;
  const [draggedEl, setDraggedEl] = useState(null);

  const handleDragStart = (e) => {
    setDraggedEl(e.target.id);
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggedEl(null);
    setTimeout(() => {
      e.target.style.display = '';
    }, 0);
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

  const handleDrop = (e) => {
    const test1 = STATUSES.includes(e.target.id);
    const test2 = STATUSES.includes(e.target.parentElement.id);
    if (test1 || test2) {
      const statusColumn = test1 ? e.target.id : e.target.parentElement.id;
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
        {STATUSES.map((status, i) => (
          <LinkKanbanColumn
            key={status + i}
            setLinkToEdit={setLinkToEdit}
            availableGroups={availableGroups}
            columnName={status}
            rows={linksToDisplay.filter((link) => link.status === status)}
          />
        ))}
      </div>
    </div>
  );
};

KanbanView.propTypes = {};

export default KanbanView;
