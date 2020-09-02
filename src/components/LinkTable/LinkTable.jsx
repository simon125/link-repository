/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import GridLoader from 'react-spinners/ClipLoader';

import { ALL_OPTION } from '../../constants';
import GridView from './GridView';
import KanbanView from './KanbanView';
import LinkTableFilter from './LinkTableFilter';
import ViewToggler from './ViewToggler';

const style = {
  listContainer: { display: 'flex', justifyContent: 'space-around' },
  tableHeaderCell: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
  },
  spinnerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
};

const LinkTable = (props) => {
  const {
    linksToDisplay = [],
    availableGroups,
    setLinkToEdit,
    showSpinner,
  } = props;

  const [filters, setFilters] = useState({
    group: ALL_OPTION,
    status: ALL_OPTION,
    title: '',
  });

  const [kanbanView, setKanbanView] = useState(false);

  const displayingComponentProps = {
    setLinkToEdit,
    availableGroups,
    linksToDisplay,
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-5">
      <div className="flex my-5 justify-between">
        <ViewToggler setKanbanView={setKanbanView} kanbanView={kanbanView} />
        {!kanbanView && (
          <LinkTableFilter
            filters={filters}
            setFilters={setFilters}
            availableGroups={availableGroups}
          />
        )}
      </div>
      {kanbanView ? (
        <KanbanView {...displayingComponentProps} />
      ) : (
        <GridView filters={filters} {...displayingComponentProps} />
      )}
      <div style={style.spinnerContainer}>
        {/* TODO: move size and color to constatnts */}
        <GridLoader size={100} color="#123abc" loading={showSpinner} />
      </div>
    </div>
  );
};

LinkTable.propTypes = {
  linksToDisplay: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      group: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  setLinkToEdit: PropTypes.func,
  showSpinner: PropTypes.bool,
};

export default LinkTable;
