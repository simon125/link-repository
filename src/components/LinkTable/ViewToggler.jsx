import React from 'react';

import PropTypes from 'prop-types';

import kanbanIcon from '../../assets/images/kanbanicon.png';

const style = { button: { height: 40 } };

const ViewToggler = (props) => {
  const { kanbanView, setKanbanView } = props;
  return (
    <div className="inline-flex mt-5 mr-4">
      <button
        type="button"
        onClick={() => setKanbanView(true)}
        title="Kanban view"
        style={style.button}
        className={`bg-gray-${kanbanView ? 400 : 200} hover:bg-gray-${
          kanbanView ? 400 : 200
        } text-gray-800 font-bold pt-1 px-4 rounded-r`}
      >
        <img style={{ width: 24, height: 24 }} src={kanbanIcon} alt="Kanban" />
      </button>
      <button
        type="button"
        onClick={() => setKanbanView(false)}
        title="Table view"
        style={style.button}
        className={`bg-gray-${kanbanView ? 200 : 400} hover:bg-gray-${
          kanbanView ? 200 : 400
        } text-gray-800 font-bold pt-1 px-4 rounded-r`}
      >
        <span className="fas fa-list fa-lg" />
      </button>
    </div>
  );
};

ViewToggler.propTypes = {
  kanbanView: PropTypes.bool.isRequired,
  setKanbanView: PropTypes.func.isRequired,
};

export default ViewToggler;
