import React, { useState } from 'react';
import LinkTableFilter from './LinkTableFilter';
import LinkTableRow from './LinkTableRow';
import LinkKanbanColumn from './LinkKanbanColumn';
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
    const test1 = STATUSES.includes(e.target.id);
    const test2 = STATUSES.includes(e.target.parentElement.id);
    if (test1 || test2) {
      const statusColumn = test1 ? e.target.id : e.target.parentElement.id;

      linksToDisplay.forEach((link) => {
        if (link.title === draggedEl) {
          updateLink(link.id, { ...link, status: statusColumn });
        }
      });
    }
    e.currentTarget.style.backgroundColor = 'rgba(180, 210, 220,0.2)';
  };

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
            {STATUSES.map((status, i) => (
              <LinkKanbanColumn
                key={status + i}
                setLink={setLink}
                availableGroups={availableGroups}
                rowHandlers={rowHandlers}
                statusName={status}
                handlers={kanbanColumnHandlers}
                rows={linksToDisplay
                  .filter(bySetFilters)
                  .filter((link) => link.status === status)}
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

export default LinkTable;
