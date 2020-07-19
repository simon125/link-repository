import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

  return (
    <div
      style={{ width: '100%' }}
      className=" rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
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
        <select
          value={statusToDisplay}
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
        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {status}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {group}
        </span> */}
      </div>
    </div>
  );
};

LinkCard.propTypes = {};

export default LinkCard;
