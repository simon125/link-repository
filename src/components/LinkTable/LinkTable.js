import React, { useState, useEffect } from 'react';
import LinkTableFilter from './LinkTableFilter';
import LinkTableRow from './LinkTableRow';
import LinkKanbanColumn from './LinkKanbanColumn';
import PropTypes from 'prop-types';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';
import kanbanIcon from '../../kanbanicon.png';

const STATUSES = ['Not touched', 'In progress', 'Already read'];

const style = {
  listContainer: { display: 'flex', justifyContent: 'space-around' },
};

const LinkTable = (props) => {
  const { linksToDisplay = [], availableGroups, setLink } = props;

  const [filters, setFilters] = useState({
    group: 'All',
    status: 'All',
    title: '',
  });
  const [elements, setElements] = useState([]);
  const [draggedEl, setDraggedEl] = useState(null);
  const [kanbanView, setKanbanView] = useState(false);

  const handleDragStart = (e) => {
    const target = e.target;
    setDraggedEl(e.target.id);
    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  };
  const handleDragEnd = (e) => {
    const target = e.target;
    setDraggedEl(null);

    setTimeout(() => {
      target.style.display = '';
    }, 0);
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

  const handleDrop = (e) => {
    if (
      STATUSES.includes(e.target.id) ||
      STATUSES.includes(e.target.parentElement.id)
    ) {
      const colNum = STATUSES.includes(e.target.id)
        ? e.target.id
        : e.target.parentElement.id;

      setElements([
        ...elements.filter((el) => {
          if (el.title === draggedEl) {
            updateLink(el.id, { ...el, status: colNum });
          }
          return el.title !== draggedEl;
        }),
        { name: draggedEl, status: colNum },
      ]);
    }
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

  // backgroundColor: 'rgba(255,255,255,0.8)',
  // backgroundColor: 'rgba(180, 210, 220,0.2)',

  useEffect(() => {
    setElements(linksToDisplay);
  }, [linksToDisplay]);

  const rowHandlers = {
    removeLink,
    updateLink,
  };

  const kanbanColumnHandlers = {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };

  const bySetFilters = (link) => {
    const { group, title, status } = filters;
    let groupMatch = false,
      titleMatch = false,
      statusMatch = false;
    if (group === 'All' || group === link.group) {
      groupMatch = true;
    }
    if (title === '' || link.title.includes(title)) {
      titleMatch = true;
    }
    if (status === 'All' || status === link.status) {
      statusMatch = true;
    }
    return groupMatch && titleMatch && statusMatch;
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-5">
      <div className="flex my-5 justify-between">
        <div className="inline-flex mt-5 mr-4">
          <button
            onClick={() => setKanbanView(true)}
            title="Kanban view"
            style={{ height: 40 }}
            className={`bg-gray-${kanbanView ? 400 : 200} hover:bg-gray-${
              kanbanView ? 400 : 200
            } text-gray-800 font-bold pt-1 px-4 rounded-r`}
          >
            <img
              style={{ width: 24, height: 24 }}
              src={kanbanIcon}
              alt="Kanban"
            />
          </button>
          <button
            onClick={() => setKanbanView(false)}
            title="Table view"
            style={{ height: 40 }}
            className={`bg-gray-${kanbanView ? 200 : 400} hover:bg-gray-${
              kanbanView ? 200 : 400
            } text-gray-800 font-bold pt-1 px-4 rounded-r`}
          >
            <span className="fas fa-list fa-lg" />
          </button>
        </div>
        <LinkTableFilter
          filters={filters}
          setFilters={setFilters}
          availableGroups={availableGroups}
        />
      </div>
      {kanbanView ? (
        <div
          style={{
            minHeight: '100vh',
          }}
        >
          <div style={style.listContainer}>
            {STATUSES.map((status) => (
              <LinkKanbanColumn
                key={status}
                setLink={setLink}
                availableGroups={availableGroups}
                rowHandlers={rowHandlers}
                statusName={status}
                handlers={kanbanColumnHandlers}
                rows={elements.filter((el) => el.status === status)}
                // {...link}
              />
            ))}
          </div>
        </div>
      ) : (
        <table className="table-auto w-full mb-2">
          <thead>
            <tr>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Group</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2" colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {linksToDisplay.filter(bySetFilters).map((link) => (
              <LinkTableRow
                key={link.id}
                setLink={setLink}
                availableGroups={availableGroups}
                rowHandlers={rowHandlers}
                {...link}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

LinkTable.propTypes = {};

export default LinkTable;
