import { db } from './firebaseInit';

export const addLink = (link, user) => {
  return db.collection('links').add({
    userUid: user.uid,
    iframeFriendly: true,
    ...link,
  });
};

export const removeLink = (id) => {
  return db.collection('links').doc(id).delete();
};

export const updateLink = (id, link) => {
  return db.collection('links').doc(id).update(link);
};

export const addGroup = (group, user) => {
  return db.collection('groups').add({
    userUid: user.uid,
    value: group,
  });
};

export const removeGroup = (id) => {
  return db.collection('groups').doc(id).delete();
};

export const updateGroup = (id, optionName) => {
  return db.collection('groups').doc(id).update({ value: optionName });
};
