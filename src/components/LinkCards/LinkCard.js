import React, { useState, useEffect } from 'react';

const FAVICON_SERVICE_URL = 'http://www.google.com/s2/favicons?domain=';
const AVAILABLE_STATUSES = ['Already read', 'In progress', 'Not touched'];

const LinkCard = ({
  link: { url, title, description, status, group, id },
  availableGroups,
  rowHandlers,
}) => {
  const [groupToDisplay, setGroupToDisplay] = useState(group);
  const [statusToDisplay, setStatusToDisplay] = useState(status);

  useEffect(() => {
    setGroupToDisplay(group);
    setStatusToDisplay(status);
  }, [group, status]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'groupToDisplay':
        setGroupToDisplay(e.target.value);
        rowHandlers.updateLink(id, { group: e.target.value });
        break;
      case 'statusToDisplay':
        setStatusToDisplay(e.target.value);
        rowHandlers.updateLink(id, { status: e.target.value });
        break;
      default:
    }
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    rowHandlers.setLink({
      description,
      group,
      status,
      title,
      url,
      id,
    });
    rowHandlers.handleShowForm();
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    rowHandlers.removeLink(id);
  };

  return (
    <div
      style={{ width: '100%' }}
      className=" rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex">
          {' '}
          <img
            style={{ width: 20, height: 20 }}
            className="mr-2"
            src={`${FAVICON_SERVICE_URL}${url}`}
            alt=""
          />
          {title}
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <select
          defaultValue={groupToDisplay}
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
        <select
          defaultValue={statusToDisplay}
          onChange={handleChange}
          style={{ height: 45 }}
          name="statusToDisplay"
          id="statusToDisplay"
          className={`shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
        >
          {AVAILABLE_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
        <div className="pt-3 flex justify-around">
          <button
            style={{ height: 30, width: 30 }}
            type="button"
            onClick={handleEditButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            <span className="fas fa-pen" />{' '}
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
            style={{ height: 30, width: 30 }}
            type="button"
            onClick={handleDeleteButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            <span className="fas fa-trash-alt " />{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
