import React, { useState, useEffect } from 'react';
import LinkTableFilter from './LinkTableFilter';
import LinkTableRow from './LinkTableRow';
import LinkTableFooter from './LinkTableFooter';
import PropTypes from 'prop-types';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';

const LinkTable = (props) => {
  const { linksToDisplay, availableGroups, setLink } = props;
  const [linksToDisplayWithCheckbox, setLinksToDisplayWithCheckbox] = useState(
    []
  );
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
      <LinkTableFilter availableGroups={availableGroups} />

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
          {linksToDisplayWithCheckbox.map((link) => (
            <LinkTableRow
              setLink={setLink}
              handleCheckRow={handleCheckRow}
              availableGroups={availableGroups}
              rowHandlers={rowHandlers}
              {...link}
            />
          ))}
        </tbody>
      </table>
      <LinkTableFooter />
    </div>
  );
};

LinkTable.propTypes = {};

export default LinkTable;
