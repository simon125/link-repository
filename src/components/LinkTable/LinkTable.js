import React, { useState } from 'react';
import LinkTableFilter from './LinkTableFilter';
import LinkTableRow from './LinkTableRow';
import LinkKanbanColumn from './LinkKanbanColumn';
import { removeLink, updateLink } from '../../firebase/firebaseCRUD';
import kanbanIcon from '../../kanbanicon.png';
import GridLoader from 'react-spinners/ClipLoader';

const STATUSES = ['Not touched', 'In progress', 'Already read'];

const style = {
  listContainer: { display: 'flex', justifyContent: 'space-around' },
  tableHeaderCell: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
  },
};

const LinkTable = (props) => {
  const { linksToDisplay = [], availableGroups, setLink, showSpinner } = props;

  const [filters, setFilters] = useState({
    group: 'All',
    status: 'All',
    title: '',
  });
  // TODO: consider more elegant implementation for sort
  //  const [sortState, setSortState] = useState(null);
  const [titleSort, setTitleSort] = useState(null);
  const [groupSort, setGroupSort] = useState(null);
  const [statusSort, setStatusSort] = useState(null);

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

  // TODO: consider more elegant implementation for sort
  const bySetParams = (link1, link2) => {
    if (titleSort !== null) {
      return titleSort
        ? link1.title.localeCompare(link2.title)
        : link2.title.localeCompare(link1.title);
    } else if (groupSort !== null) {
      return groupSort
        ? link1.group.localeCompare(link2.group)
        : link2.group.localeCompare(link1.group);
    } else if (statusSort !== null) {
      return statusSort
        ? link1.status.localeCompare(link2.status)
        : link2.status.localeCompare(link1.status);
    }
  };

  const handleTitleClick = (e) => {
    setTitleSort(!titleSort);
    setStatusSort(null);
    setGroupSort(null);
  };

  const handleGroupClick = (e) => {
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
              <th className="border px-4 py-2">
                <button
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
                  setLink={setLink}
                  availableGroups={availableGroups}
                  rowHandlers={rowHandlers}
                  link={link}
                />
              ))}
          </tbody>
        </table>
      )}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <GridLoader size={100} color={'#123abc'} loading={showSpinner} />
      </div>
    </div>
  );
};

export default LinkTable;
