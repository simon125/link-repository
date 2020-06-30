import { db } from './firebaseInit';

export const addLink = (link, user) => {
  const { url, group, status, title, description } = link;
  return db.collection('links').add({
    userUid: user.uid,
    url,
    group,
    status,
    title,
    description,
  });
};
