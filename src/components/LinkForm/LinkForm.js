import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../CustomSelect/CustomSelect';

const LinkForm = ({ currentUser }) => {
  const [isNewLink, setIsNewLink] = useState(true);

  const [link, setLink] = useState({ value: '', error: null });
  const [group, setGroup] = useState({ value: '', error: null });
  const [status, setStatus] = useState({ value: '', error: null });
  const [title, setTitle] = useState({
    value: '',
    error: null,
  });
  const [description, setDescription] = useState({
    value: '',
    error: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let promise;
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    if (isNewLink) {
      promise = 1; //create();
    } else {
      promise = 2; //update();
    }

    // promise.catch((err) => {
    //   if (err.code === 'auth/wrong-password') {
    //     setPassword({ ...password, error: err.message });
    //   }
    //   console.error(err);
    // });
  };

  const validateForm = () => {
    const isLinkValid = validateURL(link.value);
    if (!isLinkValid) {
      setLink({ ...link, error: 'Please enter proper link' });
    }
    const isGroupValid = group.value && group.value.trim() !== '';
    if (!isGroupValid) {
      setGroup({ ...group, error: 'Group is invalid!' });
    }
    const isStatusValid = status.value && status.value.trim() !== '';
    if (!isStatusValid) {
      setStatus({ ...status, error: 'Please select status!' });
    }
    const isTitleValid = title.value && title.value.trim() !== '';
    if (!isTitleValid) {
      setTitle({ ...title, error: 'Please enter valid title!' });
    }
    const isDescriptionValid =
      description.value && description.value.trim() !== '';
    if (!isDescriptionValid) {
      setDescription({
        ...description,
        error: 'Please enter valid description!',
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

  const validateURL = (url) => {
    if (url && url.trim() === '') {
      return false;
    }
    const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return regexp.test(url);
  };

  const handleCancelClick = (e) => {};

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="bg-white shadow-md rounded px-8 pb-8 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="link"
        >
          Link
        </label>
        <input
          className={`${
            link.error && 'border-red-500'
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="link"
          name="link"
          type="text"
          placeholder="Link"
        />
        {link.error && (
          <p className="text-red-500 text-xs italic">{link.error}</p>
        )}
      </div>
      <div>
        <CustomSelect />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-5"
          htmlFor="status"
        >
          Status
        </label>

        <select
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
          className="block text-gray-700 text-sm font-bold mb-2 mt-5"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          name="title"
          maxLength="15"
          type="text"
          placeholder="Title"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-5"
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          type="text"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Link
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
