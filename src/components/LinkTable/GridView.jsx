import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LinkTableRow from './LinkTableRow';
import { ALL_OPTION } from '../../constants';

const style = {};

const GridView = (props) => {
  const { setLinkToEdit, availableGroups, linksToDisplay, filters } = props;

  // TODO: consider more elegant implementation for sort
  //  const [sortState, setSortState] = useState(null);
  const [titleSort, setTitleSort] = useState(null);
  const [groupSort, setGroupSort] = useState(null);
  const [statusSort, setStatusSort] = useState(null);
  // TODO: consider more elegant implementation for sort
  const bySetParams = (link1, link2) => {
    if (titleSort !== null) {
      return titleSort
        ? link1.title.localeCompare(link2.title)
        : link2.title.localeCompare(link1.title);
    }
    if (groupSort !== null) {
      return groupSort
        ? link1.group.localeCompare(link2.group)
        : link2.group.localeCompare(link1.group);
    }
    if (statusSort !== null) {
      return statusSort
        ? link1.status.localeCompare(link2.status)
        : link2.status.localeCompare(link1.status);
    }
  };

  const bySetFilters = (link) => {
    const { group, title, status } = filters;
    let groupMatch = false;
    let titleMatch = false;
    let statusMatch = false;
    if (group === ALL_OPTION || group === link.group) {
      groupMatch = true;
    }
    if (title === '' || link.title.includes(title)) {
      titleMatch = true;
    }
    if (status === ALL_OPTION || status === link.status) {
      statusMatch = true;
    }
    return groupMatch && titleMatch && statusMatch;
  };

  const handleTitleClick = () => {
    setTitleSort(!titleSort);
    setStatusSort(null);
    setGroupSort(null);
  };

  const handleGroupClick = () => {
    setTitleSort(null);
    setStatusSort(null);
    setGroupSort(!groupSort);
  };

  const handleStatusClick = () => {
    setTitleSort(null);
    setStatusSort(!statusSort);
    setGroupSort(null);
  };

  return (
    <table className="table-auto w-full mb-2">
      <thead>
        <tr>
          <th className="border px-4 py-2" />
          <th className="border px-4 py-2">
            <button
              type="button"
              onClick={handleTitleClick}
              style={style.tableHeaderCell}
            >
              Title
              {titleSort === true && (
                <span className="ml-2 fas fa-long-arrow-alt-down" />
              )}
              {titleSort === false && (
                <span className="ml-2 fas fa-long-arrow-alt-up" />
              )}
            </button>{' '}
          </th>
          <th className="border px-4 py-2">
            <button
              type="button"
              onClick={handleGroupClick}
              style={style.tableHeaderCell}
            >
              Group
              {groupSort === true && (
                <span className="ml-2 fas fa-long-arrow-alt-down" />
              )}
              {groupSort === false && (
                <span className="ml-2 fas fa-long-arrow-alt-up" />
              )}
            </button>
          </th>
          <th className="border px-4 py-2">
            <button
              type="button"
              onClick={handleStatusClick}
              style={style.tableHeaderCell}
            >
              Status
              {statusSort === true && (
                <span className="ml-2 fas fa-long-arrow-alt-down" />
              )}
              {statusSort === false && (
                <span className="ml-2 fas fa-long-arrow-alt-up" />
              )}
            </button>
          </th>
          <th className="border px-4 py-2" colSpan="2"></th>
        </tr>
      </thead>
      <tbody>
        {linksToDisplay
          .filter(bySetFilters)
          .sort(bySetParams)
          .map((link) => (
            <LinkTableRow
              key={link.id}
              setLinkToEdit={setLinkToEdit}
              availableGroups={availableGroups}
              link={link}
            />
          ))}
      </tbody>
    </table>
  );
};

GridView.propTypes = {};

export default GridView;
