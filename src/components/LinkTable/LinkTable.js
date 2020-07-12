import React, { useState, useEffect } from 'react';
import LinkTableFilter from './LinkTableFilter';
import LinkTableRow from './LinkTableRow';
import PropTypes from 'prop-types';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';

const LinkTable = (props) => {
  const { linksToDisplay, availableGroups, setLink } = props;
  const [linksToDisplayWithCheckbox, setLinksToDisplayWithCheckbox] = useState(
    []
  );
  const [filters, setFilters] = useState({
    group: 'All',
    status: 'All',
    title: '',
  });

  useEffect(() => {
    setLinksToDisplayWithCheckbox(
      linksToDisplay.map((link) => ({ ...link, checkbox: false }))
    );
  }, [linksToDisplay]);

  const handleCheckRow = (id) => {
    setLinksToDisplayWithCheckbox(
      linksToDisplayWithCheckbox.map((link) => {
        if (link.id === id) {
          link.checkbox = !link.checkbox;
        }
        return link;
      })
    );
  };

  const rowHandlers = {
    removeLink,
    updateLink,
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-5">
      <LinkTableFilter
        filters={filters}
        setFilters={setFilters}
        availableGroups={availableGroups}
      />

      <table className="table-auto w-full mb-2">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">
              {' '}
              <input
                id="link"
                type="checkbox"
                onChange={(e) => {
                  setLinksToDisplayWithCheckbox(
                    linksToDisplayWithCheckbox.map((link) => {
                      link.checkbox = e.target.checked;
                      return link;
                    })
                  );
                }}
              />
            </th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Group</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {linksToDisplayWithCheckbox
            .filter((link) => {
              let groupMatch = false,
                titleMatch = false,
                statusMatch = false;
              if (filters.group === 'All' || filters.group === link.group) {
                groupMatch = true;
              }
              if (filters.title === '' || link.title.includes(filters.title)) {
                titleMatch = true;
              }
              if (filters.status === 'All' || filters.status === link.status) {
                statusMatch = true;
              }
              return groupMatch && titleMatch && statusMatch;
            })
            .map((link) => (
              <LinkTableRow
                key={link.id}
                setLink={setLink}
                handleCheckRow={handleCheckRow}
                availableGroups={availableGroups}
                rowHandlers={rowHandlers}
                {...link}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

LinkTable.propTypes = {};

export default LinkTable;
