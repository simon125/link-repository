/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { ALL_OPTION } from '../../constants';
import TableFooter from './TableFooter';
import LinkTableRow from './TableRow';

const style = {};

const LinksTable = (props) => {
  const { setLinkToEdit, availableGroups, linksToDisplay, filters, rowHandlers } = props;

  // TODO: consider more elegant implementation for sort
  //  const [sortState, setSortState] = useState(null);
  const [titleSort, setTitleSort] = useState(null);
  const [groupSort, setGroupSort] = useState(null);
  const [statusSort, setStatusSort] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // TODO: consider more elegant implementation for sort
  const bySetParams = (link1, link2) => {
    if (titleSort !== null) {
      return sortCondition(link1, link2, 'title', titleSort);
    }
    if (groupSort !== null) {
      return sortCondition(link1, link2, 'group', groupSort);
    }
    if (statusSort !== null) {
      return sortCondition(link1, link2, 'status', statusSort);
    }
  };

  const sortCondition = (link1, link2, fieldName, asc) => {
    return asc
      ? link1[fieldName].localeCompare(link2[fieldName])
      : link2[fieldName].localeCompare(link1[fieldName]);
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

  const itemsPerPage = 7;

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

  const filteredAndSortedLinks = linksToDisplay.filter(bySetFilters).sort(bySetParams);
  const paginatedLinks = filteredAndSortedLinks.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage,
  );

  return (
    <table className="table-auto w-full mb-2">
      <thead>
        <tr>
          <th className="border px-4 py-2" />
          <th className="border px-4 py-2">
            <button type="button" onClick={handleTitleClick} style={style.tableHeaderCell}>
              Title
              {titleSort === true && <span className="ml-2 fas fa-long-arrow-alt-down" />}
              {titleSort === false && <span className="ml-2 fas fa-long-arrow-alt-up" />}
            </button>
          </th>
          <th className="border px-4 py-2">
            <button type="button" onClick={handleGroupClick} style={style.tableHeaderCell}>
              Group
              {groupSort === true && <span className="ml-2 fas fa-long-arrow-alt-down" />}
              {groupSort === false && <span className="ml-2 fas fa-long-arrow-alt-up" />}
            </button>
          </th>
          <th className="border px-4 py-2">
            <button type="button" onClick={handleStatusClick} style={style.tableHeaderCell}>
              Status
              {statusSort === true && <span className="ml-2 fas fa-long-arrow-alt-down" />}
              {statusSort === false && <span className="ml-2 fas fa-long-arrow-alt-up" />}
            </button>
          </th>
          <th className="border px-4 py-2" colSpan="2" />
        </tr>
      </thead>
      <tbody>
        {paginatedLinks.map((link) => (
          <LinkTableRow
            key={link.id}
            setLinkToEdit={setLinkToEdit}
            availableGroups={availableGroups}
            rowHandlers={rowHandlers}
            link={link}
          />
        ))}
      </tbody>
      <TableFooter
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        itemsAmount={filteredAndSortedLinks.length}
        itemsPerPage={itemsPerPage}
      />
    </table>
  );
};

LinksTable.propTypes = {
  setLinkToEdit: PropTypes.func.isRequired,
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  linksToDisplay: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  rowHandlers: PropTypes.shape({
    updateLink: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
  }).isRequired,
};

LinksTable.defaultProps = {
  availableGroups: [],
  linksToDisplay: [],
  filters: {
    group: 'All',
    status: 'All',
    title: '',
  },
};

export default LinksTable;
