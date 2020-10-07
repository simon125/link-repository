import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  addLink,
  addGroup,
  removeGroup,
  updateGroup,
  updateLink,
} from '../../firebase/firebaseCRUD';
import showToast from '../../utils';
import CustomSelect from '../CustomSelect/CustomSelect';

// eslint-disable-next-line no-useless-escape
const VALID_URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const INITIAL_VALUE = {
  value: '',
  error: null,
};

const LinkForm = (props) => {
  const { currentUser, availableGroups, linkToEdit, handleHideForm } = props;
  const [id, setId] = useState(null);
  const [link, setLink] = useState(INITIAL_VALUE);
  const [group, setGroup] = useState(INITIAL_VALUE);
  const [status, setStatus] = useState(INITIAL_VALUE);
  const [title, setTitle] = useState(INITIAL_VALUE);
  const [description, setDescription] = useState(INITIAL_VALUE);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const { description, group, id, status, title, url } = linkToEdit;
    const error = null;
    setId(id);
    setLink({ error, value: url || '' });
    setGroup({ error, value: group || '' });
    setStatus({ error, value: status || '' });
    setTitle({ error, value: title || '' });
    setDescription({ error, value: description || '' });
  }, [linkToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    const linkToProcess = {
      url: link.value,
      group: group.value,
      status: status.value,
      title: title.value,
      description: description.value,
    };
    const promise = id ? updateLink(id, linkToProcess) : addLink(linkToProcess, currentUser);

    promise
      .then(() => {
        const msg = id ? 'You successfully updated link' : 'You successfully added new link';
        showToast(msg, 'success');
      })
      .catch(() => {
        showToast('Something went wrong! Please contact with admin.', 'error');
      })
      .finally(() => {
        resetForm();
        handleHideForm();
      });
  };

  const resetForm = () => {
    const reset = { value: '', error: null };
    setId(null);
    setLink(reset);
    setGroup(reset);
    setStatus(reset);
    setTitle(reset);
    setDescription(reset);
  };

  const validateForm = () => {
    const isLinkValid = validateURL(link.value);
    if (!isLinkValid) {
      setLink({ ...link, error: 'Please enter proper link' });
    }
    const isGroupValid = group.value && group.value.trim() !== '';
    if (!isGroupValid) {
      setGroup({ ...group, error: 'Please select group!' });
    }
    const isStatusValid = status.value && status.value.trim() !== '';
    if (!isStatusValid) {
      setStatus({ ...status, error: 'Please select status!' });
    }
    const isTitleValid = title.value && title.value.trim() !== '';
    if (!isTitleValid) {
      setTitle({ ...title, error: 'Please enter proper title!' });
    }
    const isDescriptionValid = description.value && description.value.trim() !== '';
    if (!isDescriptionValid) {
      setDescription({
        ...description,
        error: 'Please enter proper description!',
      });
    }
    return isLinkValid && isGroupValid && isStatusValid && isTitleValid && isDescriptionValid;
  };

  const validateURL = (url) => {
    if (url && url.trim() === '') {
      return false;
    }
    return VALID_URL_REGEXP.test(url);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const error = null;
    const changedValue = { error, value };
    switch (e.target.name) {
      case 'link':
        setLink(changedValue);
        break;
      case 'group':
        setGroup(changedValue);
        break;
      case 'status':
        setStatus(changedValue);
        break;
      case 'title':
        setTitle(changedValue);
        break;
      case 'description':
        setDescription(changedValue);
        break;
      default:
    }
  };

  const handleCancelClick = () => {
    resetForm();
  };

  const customSelectHandlers = {
    handleChange: (e) => {
      setGroup({ error: null, value: e.target.dataset.value });
    },
    removeGroup,
    addGroup: (newGroup) => addGroup(newGroup, currentUser),
    updateGroup: (optionId, optionName) => {
      updateGroup(optionId, optionName);
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="bg-white shadow-md rounded px-3 pb-8"
    >
      <div className="mb-4 pt-1">
        <label className="block text-gray-700 text-sm font-bold mt-3" htmlFor="link">
          Link
          <input
            value={link.value}
            onChange={handleChange}
            className={`${
              link.error && 'border-red-500'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            name="link"
            type="text"
            placeholder="Link"
          />
        </label>
        {link.error && <p className="text-red-500 text-xs italic">{link.error}</p>}
      </div>
      <div>
        <CustomSelect
          handlers={customSelectHandlers}
          options={availableGroups}
          value={group.value}
          error={group.error}
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="status">
          Status
          {/* TODO: WTF? */}
          <select
            value={status.value}
            onChange={handleChange}
            name="status"
            id="status"
            className={` ${
              status.error && 'border-red-500'
            } shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
          >
            {/* TODO: WTF? */}
            <option hidden value="">
              Select Status
            </option>
            <option value="Already read">Already read</option>
            <option value="In progress">In progress</option>
            <option value="Not touched">Not touched</option>
          </select>
        </label>
        {status.error && <p className="text-red-500 text-xs italic">{status.error}</p>}

        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="title">
          Title
          <input
            value={title.value}
            onChange={handleChange}
            className={`${
              title.error && 'border-red-500'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="title"
            name="title"
            maxLength="15"
            type="text"
            placeholder="Title"
          />
        </label>
        {title.error && <p className="text-red-500 text-xs italic">{title.error}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="description">
          Description
          <textarea
            value={description.value}
            onChange={handleChange}
            className={`${
              description.error && 'border-red-500'
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="description"
            name="description"
            type="text"
            placeholder="Description"
          />
        </label>
        {description.error && <p className="text-red-500 text-xs italic">{description.error}</p>}
      </div>
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {id ? 'Update link' : 'Add link'}
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-3 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

LinkForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentUser: PropTypes.object,
  availableGroups: PropTypes.arrayOf(PropTypes.object),
  linkToEdit: PropTypes.shape({
    description: PropTypes.string,
    group: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  handleHideForm: PropTypes.func.isRequired,
};

LinkForm.defaultProps = {
  currentUser: null,
  availableGroups: [],
};

export default LinkForm;
