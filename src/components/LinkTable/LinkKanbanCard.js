import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
};

const LinkKanbanCard = ({
  rowHandlers,
  description,
  group,
  status,
  title,
  url,
  id,
  handleDragStart,
  handleDragEnd,
  availableGroups,
  setLink,
}) => {
  const [groupToDisplay, setGroupToDisplay] = useState(group);

  useEffect(() => {
    setGroupToDisplay(group);
  }, [group]);

  const handleChange = (e) => {
    setGroupToDisplay(e.target.value);
    rowHandlers.updateLink(id, { group: e.target.value });
  };

  return (
    <div
      title={url}
      key={title}
      id={title}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={true}
      style={style.listItem}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 15 }}
      >
        <img
          style={{ width: 20, height: 20 }}
          src={`http://www.google.com/s2/favicons?domain=${url}`}
          alt=""
        />
      </div>
      {title}
      <select
        value={groupToDisplay}
        onChange={handleChange}
        style={{ height: 45 }}
        name="groupToDisplay"
        id="groupToDisplay"
        className={`shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
      >
        {availableGroups.map((gr) => (
          <option key={gr.id} value={gr.value}>
            {gr.value}
          </option>
        ))}
      </select>
      <div className="border py-2 flex justify-around">
        <button
          style={{ height: 30, width: 30, position: 'relative' }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLink({
              description,
              group,
              status,
              title,
              url,
              id,
            });
          }}
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="fas fa-pen"
          />{' '}
        </button>

        <a
          style={{ height: 30, width: 30, position: 'relative' }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="fas fa-link"
          />{' '}
        </a>
        <button
          style={{ height: 30, width: 30, position: 'relative' }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rowHandlers.removeLink(id);
          }}
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="fas fa-trash-alt "
          />{' '}
        </button>
      </div>
    </div>
  );
};

LinkKanbanCard.propTypes = {};

export default LinkKanbanCard;
