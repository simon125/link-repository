import React from 'react';

const About = () => {
  return (
    <div style={{ padding: 50 }}>
      <h1>Welcome in link repository app</h1>
      <p>
        Nice to see you here! This app is simple CRUD app or maybe tool for
        store and manage links in way that I wanted
      </p>
      <p>Feel free to fork, star or making pull requests</p>
      <p>
        Project is still development it is kind of break in my bugger project
        Bill-tracker
      </p>
      <p>
        If you have some problems with cards in your browser this app might be
        for YOU
      </p>
      <h3>link-repository 1.0.0</h3>
      <h4>TODO:</h4>{' '}
      <ul>
        <li>[ ] unit tests</li>
        <li>[ ] pagination</li>
        <li>[ ] modal with detail and quick view</li>
        <li>[ ] view of link, tooltip with url?</li>
        <li>
          [ ] batch job which change group name in links which are using deleted
          group
        </li>
        <li>[ ] validation for removing links and groups</li>
        <li>[ ] remember me btn</li>
        <li>[ ] login by fb/google/gh who knows :D </li>
        <li>[ ] fix eslint issues </li>
      </ul>
    </div>
  );
};

export default About;
