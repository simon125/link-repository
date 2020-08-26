import React, { useState } from 'react';

const CustomSelectOption = ({
  option,
  isEditModeOnGlobal,
  handlers: {
    handleChange,
    setIsOpen,
    removeGroup,
    setIsEditModeOnGlobal,
    updateGroup,
  },
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [optionName, setOptionName] = useState(option.value);

  const handleCancelClick = () => {
    setIsEditModeOnGlobal(false);
    setIsEditMode(false);
    setOptionName(optionName);
  };

  const handleListItemClick = (e) => {
    handleChange(e);
    setIsOpen(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditModeOnGlobal(true);
    setIsEditMode(true);
  };

  const handleDeleteClick = (e) => {
    removeGroup(option.id);
    e.stopPropagation();
  };

  const handleSaveClick = () => {
    updateGroup(option.id, optionName);
    setIsEditModeOnGlobal(false);
    setIsEditMode(false);
  };

  const handleOptionNameChange = (e) => setOptionName(e.target.value);

  return (
    <>
      {!isEditModeOnGlobal || !isEditMode ? (
        <li
          data-value={option.value}
          onClick={handleListItemClick}
          className="custom-select__option flex justify-between"
        >
          {option.value}
          <div>
            <button
              type="button"
              onClick={handleEditClick}
              className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
            >
              <span className="fas fa-pen" />{' '}
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded"
            >
              <span className="fas fa-trash-alt " />{' '}
            </button>
          </div>
        </li>
      ) : (
        <li className="custom-select__option--input flex">
          <input
            value={optionName}
            onChange={handleOptionNameChange}
            style={{ width: '60%' }}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
          />
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {window.innerWidth < 600 ? (
              <span className="fa fa-check" />
            ) : (
              'Save'
            )}
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            {window.innerWidth < 600 ? (
              <span className="fa fa-times" />
            ) : (
              'Cancel'
            )}
          </button>
        </li>
      )}
    </>
  );
};

export default CustomSelectOption;
