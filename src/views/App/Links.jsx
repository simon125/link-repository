/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import GridLoader from 'react-spinners/ClipLoader';

import LinksFilters from '../../components/LinksFilters/LinksFilters';
import LinksKanbanBoard from '../../components/LinksKanbanBoard/LinksKanbanBoard';
import LinksTable from '../../components/LinksTable/LinksTable';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import { ALL_OPTION } from '../../constants';
import { updateLink, removeLink } from '../../firebase/firebaseCRUD';

const style = {
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

const Links = (props) => {
  const { linksToDisplay = [], availableGroups, setLinkToEdit, showSpinner } = props;

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
    rowHandlers: {
      updateLink,
      removeLink,
    },
  };

  const buttonsConfig = {
    leftIcon: 'fas fa-th',
    rightIcon: 'fas fa-list',
    leftTitle: '',
    rightTitle: '',
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-5">
      <div className="flex my-5 justify-between">
        <ToggleButton
          clickCallback={setKanbanView}
          buttonState={kanbanView}
          buttonsConfig={buttonsConfig}
        />
        {!kanbanView && (
          <LinksFilters
            filters={filters}
            setFilters={setFilters}
            availableGroups={availableGroups}
          />
        )}
      </div>
      {kanbanView ? (
        <LinksKanbanBoard {...displayingComponentProps} />
      ) : (
        <LinksTable filters={filters} {...displayingComponentProps} />
      )}
      <div style={style.spinnerContainer}>
        {/* TODO: move size and color to constatnts */}
        <GridLoader size={100} color="#123abc" loading={showSpinner} />
      </div>
    </div>
  );
};

Links.propTypes = {
  linksToDisplay: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      group: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  setLinkToEdit: PropTypes.func,
  showSpinner: PropTypes.bool,
};

Links.defaultProps = {
  linksToDisplay: [],
  availableGroups: [],
  setLinkToEdit: () => {},
  showSpinner: false,
};

export default Links;
