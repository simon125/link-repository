import React, { useState, useEffect } from 'react';

const FAVICON_SERVICE_URL = 'http://www.google.com/s2/favicons?domain=';
const AVAILABLE_STATUSES = ['Already read', 'In progress', 'Not touched'];

const LinkTableRow = ({
  description,
  group,
  status,
  title,
  url,
  id,
  rowHandlers,
  availableGroups,
  setLink,
}) => {
  const [showDescription, setShowDescription] = useState(false);
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

  const handleExpandButtonClick = (e) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setLink({
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
    rowHandlers.removeLink(id);
  };

  return (
    <>
      <tr title={url}>
        <td className="border text-center py-2">
          <button
            type="button"
            onClick={handleExpandButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            {showDescription ? (
              <span className="fa fa-minus fa-sm" />
            ) : (
              <span className="fa fa-plus fa-sm" />
            )}
          </button>
        </td>
        <td className="border py-2 px-3 flex content-center">
          <img
            style={{ width: 20, height: 20 }}
            className="mr-2"
            src={`${FAVICON_SERVICE_URL}${url}`}
            alt=""
          />
          {title}
        </td>
        <td className="border">
          <select
            onChange={handleChange}
            style={{ height: 45 }}
            name="groupToDisplay"
            id="groupToDisplay"
            className={`shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
          >
            {availableGroups.map((gr) => (
              <option
                selected={gr.value === group}
                key={gr.id}
                value={gr.value}
              >
                {gr.value}
              </option>
            ))}
          </select>
        </td>
        <td className="border">
          <select
            onChange={handleChange}
            style={{ height: 45 }}
            name="statusToDisplay"
            id="statusToDisplay"
            className={`shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
          >
            {AVAILABLE_STATUSES.map((st) => (
              <option selected={st === status} key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </td>
        <td style={{ height: 50 }} className="border py-2 flex justify-around">
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
        </td>
      </tr>

      {showDescription && (
        <tr>
          <td className="border p-2 pl-4" colSpan="6">
            {description}
          </td>
        </tr>
      )}
    </>
  );
};

export default LinkTableRow;
