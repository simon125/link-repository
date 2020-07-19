import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../CustomSelect/CustomSelect';
import {
  addLink,
  addGroup,
  removeGroup,
  updateGroup,
  updateLink,
} from '../../firebase/firebaseCRUD';
import { showToast } from '../../utils';

const LinkForm = ({ currentUser, availableGroups, linkToEdit }) => {
  const [id, setId] = useState(null);

  const [link, setLink] = useState({
    value: '',
    error: null,
  });
  const [group, setGroup] = useState({
    value: '',
    error: null,
  });
  const [status, setStatus] = useState({
    value: '',
    error: null,
  });
  const [title, setTitle] = useState({
    value: '',
    error: null,
  });
  const [description, setDescription] = useState({
    value: '',
    error: null,
  });

  useEffect(() => {
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
    const promise = id
      ? updateLink(id, linkToProcess)
      : addLink(linkToProcess, currentUser);

    promise
      .then((d) => {
        const msg = id
          ? 'You successfully updated link'
          : 'You successfully added new link';
        showToast(msg, 'success');
      })
      .catch((err) => {
        showToast('Something went wrong! Please contact with admin.', 'error');
        console.error(err);
      })
      .finally(() => {
        resetForm();
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
    const isDescriptionValid =
      description.value && description.value.trim() !== '';
    if (!isDescriptionValid) {
      setDescription({
        ...description,
        error: 'Please enter proper description!',
      });
    }
    return (
      isLinkValid &&
      isGroupValid &&
      isStatusValid &&
      isTitleValid &&
      isDescriptionValid
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const error = null;
    switch (e.target.name) {
      case 'link':
        setLink({ error, value });
        break;
      case 'group':
        setGroup({ error, value });
        break;
      case 'status':
        setStatus({ error, value });
        break;
      case 'title':
        setTitle({ error, value });
        break;
      case 'description':
        setDescription({ error, value });
        break;
      default:
    }
  };

  const validateURL = (url) => {
    if (url && url.trim() === '') {
      return false;
    }
    const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return regexp.test(url);
  };

  const handleCancelClick = (e) => {
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="bg-white shadow-md rounded px-3 pb-8"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mt-4"
          htmlFor="link"
        >
          Link
        </label>
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
        {link.error && (
          <p className="text-red-500 text-xs italic">{link.error}</p>
        )}
      </div>
      <div>
        <CustomSelect
          handlers={{
            handleChange: (e) => {
              setGroup({ error: null, value: e.target.dataset.value });
            },
            removeGroup,
            addGroup: (group) => addGroup(group, currentUser),
            updateGroup: (id, optionName) => {
              updateGroup(id, optionName);
            },
          }}
          options={availableGroups}
          value={group.value}
          error={group.error}
        />
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 text-sm font-bold mb-1 mt-2"
          htmlFor="status"
        >
          Status
        </label>

        <select
          value={status.value}
          onChange={handleChange}
          name="status"
          id="status"
          className={` ${
            status.error && 'border-red-500'
          } shadow block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500`}
        >
          <option hidden value="">
            Select Status
          </option>
          <option value="Already read">Already read</option>
          <option value="In progress">In progress</option>
          <option value="Not touched">Not touched</option>
        </select>
        {status.error && (
          <p className="text-red-500 text-xs italic">{status.error}</p>
        )}

        <label
          className="block text-gray-700 text-sm font-bold mb-1 mt-2"
          htmlFor="title"
        >
          Title
        </label>
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
        {title.error && (
          <p className="text-red-500 text-xs italic">{title.error}</p>
        )}
        <label
          className="block text-gray-700 text-sm font-bold mb-1 mt-2"
          htmlFor="description"
        >
          Description
        </label>

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
        ></textarea>
        {description.error && (
          <p className="text-red-500 text-xs italic">{description.error}</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {id ? 'Update link' : 'Add link'}{' '}
        </button>
        <button
          type="reset"
          onClick={handleCancelClick}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-3 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

LinkForm.propTypes = {};

export default LinkForm;
