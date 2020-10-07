/* eslint-disable max-len */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

const FAVICON_SERVICE_URL = 'http://www.google.com/s2/favicons?domain=';
const AVAILABLE_STATUSES = ['Already read', 'In progress', 'Not touched']; // TODO: move it to constants

const style = {
  select: {
    height: 45,
  },
};

const TableRow = (props) => {
  const {
    link: { description, group, status, title, url, id },
    availableGroups,
    setLinkToEdit,
    rowHandlers: { updateLink, removeLink },
  } = props;

  const [showDescription, setShowDescription] = useState(false);

  const handleChange = (e) => {
    updateLink(id, { [e.target.name]: e.target.value });
  };

  const handleExpandButtonClick = (e) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setLinkToEdit(props.link);
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    removeLink(id);
  };

  return (
    <>
      <tr title={url}>
        <td className="border" valign="middle" align="center">
          <button
            type="button"
            onClick={handleExpandButtonClick}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            {showDescription ? (
              <span className="fa fa-minus fa-sm" />
            ) : (
              <span className="fa fa-plus fa-sm" />
            )}
          </button>
        </td>
        <td className="border content-center pl-2" style={{ width: 250 }}>
          <span className="flex">
            <img
              style={{ width: 20, height: 20 }}
              className="mr-2"
              src={`${FAVICON_SERVICE_URL}${url}`}
              alt=""
            />
            {title}
          </span>
        </td>
        <td className="border" style={{ width: 250 }}>
          <select
            defaultValue={group}
            onChange={handleChange}
            style={style.select}
            name="group"
            className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
          >
            {availableGroups.map((gr) => (
              <option key={gr.id} value={gr.value}>
                {gr.value}
              </option>
            ))}
          </select>
        </td>
        <td className="border" style={{ width: 250 }}>
          <select
            defaultValue={status}
            onChange={handleChange}
            style={style.select}
            name="status"
            className="shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500"
          >
            {AVAILABLE_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </td>
        <td style={{ height: 50 }} className="border py-2 flex justify-around">
          {/* IT COULD STAY HERE FOR A MOMENT FOR THE FUTURE FEATURE - DROPDOWN FOR ACTIONS */}
          {/* <button
            style={{ height: 30, width: 30 }}
            type="button"
            // onClick={handleEditButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            <span className="fas fa-ellipsis-v" />
          </button> */}
          <button
            style={{ height: 30, width: 30 }}
            type="button"
            onClick={handleEditButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            <span className="fas fa-pen" />
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
            />
          </a>
          <button
            style={{ height: 30, width: 30 }}
            type="button"
            onClick={handleDeleteButtonClick}
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
          >
            <span className="fas fa-trash-alt " />
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

TableRow.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  rowHandlers: PropTypes.shape({
    updateLink: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
  }).isRequired,
  availableGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setLinkToEdit: PropTypes.func.isRequired,
};

export default TableRow;
