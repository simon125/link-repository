import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const FAVICON_SERVICE_URL = 'http://www.google.com/s2/favicons?domain=';

const style = {
  listItem: {
    minHeight: '40px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    margin: '10px',
    borderRadius: '5px',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#333',
    cursor: 'grab',
  },
  cardContainer: { display: 'flex', justifyContent: 'center', paddingTop: 15 },
  cardButton: { height: 30, width: 30, position: 'relative' },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  logoImage: { width: 20, height: 20 },
};

const KanbanCard = ({
  description,
  group,
  status,
  title,
  url,
  id,
  handleDragStart,
  handleDragEnd,
  availableGroups,
  setLinkToEdit,
  removeLink,
  updateLink,
}) => {
  const [groupToDisplay, setGroupToDisplay] = useState(group);

  useEffect(() => {
    setGroupToDisplay(group);
  }, [group]);

  const handleChange = (e) => {
    setGroupToDisplay(e.target.value);
    updateLink(id, { group: e.target.value });
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setLinkToEdit({
      description,
      group,
      status,
      title,
      url,
      id,
    });
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    removeLink(id);
  };

  return (
    <div
      title={url}
      key={title}
      id={title}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={style.listItem}
      draggable
    >
      <div style={style.cardContainer}>
        <img style={style.logoImage} src={`${FAVICON_SERVICE_URL}${url}`} alt="" />
      </div>
      {title}
      <select
        defaultValue={groupToDisplay}
        onChange={handleChange}
        style={{ height: 45 }}
        name="groupToDisplay"
        id="groupToDisplay"
        className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
      >
        {availableGroups.map((gr) => (
          <option key={gr.id} value={gr.value}>
            {gr.value}
          </option>
        ))}
      </select>
      <div className="border py-2 flex justify-around">
        <button
          style={style.cardButton}
          type="button"
          onClick={handleEditButtonClick}
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span style={style.iconContainer} className="fas fa-pen" />
        </button>

        <a
          style={style.cardButton}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span style={style.iconContainer} className="fas fa-link" />
        </a>
        <button
          style={style.cardButton}
          type="button"
          onClick={handleDeleteButtonClick}
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span style={style.iconContainer} className="fas fa-trash-alt " />
        </button>
      </div>
    </div>
  );
};

KanbanCard.propTypes = {
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  setLinkToEdit: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
  updateLink: PropTypes.func.isRequired,
};

KanbanCard.defaultProps = {
  availableGroups: [],
};

export default KanbanCard;
