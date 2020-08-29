import { db } from './firebaseInit';

// collections names
export const COLLECTION_LINKS = 'links';
export const COLLECTION_GROUPS = 'groups';

export const addLink = (link, user) => {
  return db.collection(COLLECTION_LINKS).add({
    userUid: user.uid,
    iframeFriendly: true,
    ...link,
  });
};

export const removeLink = (id) => {
  return db.collection(COLLECTION_LINKS).doc(id).delete();
};

export const updateLink = (id, link) => {
  return db.collection(COLLECTION_LINKS).doc(id).update(link);
};

export const addGroup = (group, user) => {
  return db.collection(COLLECTION_GROUPS).add({
    userUid: user.uid,
    value: group,
  });
};

export const removeGroup = (id) => {
  return db.collection(COLLECTION_GROUPS).doc(id).delete();
};

export const updateGroup = (id, optionName) => {
  return db.collection(COLLECTION_GROUPS).doc(id).update({ value: optionName });
};

export const setCollectionListener = (
  collectionName,
  userUid,
  setCollection
) => {
  return db
    .collection(collectionName)
    .where('userUid', '==', userUid)
    .onSnapshot((querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push({ ...doc.data(), id: doc.id });
      });
      setCollection(collection);
    });
};
