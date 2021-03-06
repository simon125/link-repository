/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import CustomSelectOption from './CustomSelectOption';

const style = {
  icon: {
    zIndex: 1,
    right: 10,
    top: 10,
    position: 'absolute',
    cursor: 'pointer',
  },
  optionsContainer: (isOpen) => ({
    display: isOpen ? 'block' : 'none',
    position: 'absolute',
    top: 38,
    left: 0,
    width: '100%',
  }),
  optionsList: {
    width: '100%',
    border: '1px solid #999',
    borderBottom: 'none',
    borderRadius: 3,
    backgroundColor: 'white',
    maxHeight: 150,
    overflowY: 'auto',
  },
  newOptionForm: {
    border: '1px solid #999',
    borderRadius: 3,
    backgroundColor: 'white',
    borderTop: 'none',
  },
};

const useOutsideAlerter = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
};

const CustomSelect = ({
  value,
  error,
  options,
  handlers: { handleChange, removeGroup, addGroup, updateGroup },
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [isEditModeOnGlobal, setIsEditModeOnGlobal] = useState(false);
  const optionHandlers = {
    handleChange,
    removeGroup,
    updateGroup,
    setIsOpen,
    setIsEditModeOnGlobal,
  };

  const handleAddGroupClick = () => {
    addGroup(newOption);
    setNewOption('');
  };

  const handleOptionChange = (e) => setNewOption(e.target.value);

  return (
    <div ref={wrapperRef}>
      <div className="flex">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
          Group
        </label>
      </div>
      <div style={{ position: 'relative' }}>
        <input
          value={value}
          onFocus={() => setIsOpen(true)}
          readOnly
          className={`${
            error && 'border-red-500'
          } custom-select__input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="group"
          type="text"
          placeholder="Select Group"
          autoComplete="off"
          style={{ cursor: 'pointer' }}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <span style={style.icon} className="fas fa-caret-down" />
        <div style={style.optionsContainer(isOpen)}>
          <ul style={style.optionsList}>
            {options.map((option) => (
              <CustomSelectOption
                key={option.id}
                option={option}
                isEditModeOnGlobal={isEditModeOnGlobal}
                handlers={optionHandlers}
              />
            ))}
          </ul>
          <div style={style.newOptionForm} className="custom-select__option--input flex">
            <input
              value={newOption}
              onChange={handleOptionChange}
              style={{ width: '60%' }}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              type="text"
              placeholder="New group"
            />
            <button
              onClick={handleAddGroupClick}
              style={{ width: '40%' }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {window.innerWidth < 500 ? '+' : 'Add Group'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    removeGroup: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
  }).isRequired,
};

CustomSelect.defaultProps = {
  value: '',
  error: null,
  options: [],
};

export default CustomSelect;
