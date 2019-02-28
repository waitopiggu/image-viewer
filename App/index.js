import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import actionTypes from './action-types';
import App from './App';
import Store from './Store';

const mapStateToProps = state => ({
  electron: state.electron,
});

const mapDispatchToProps = dispatch => ({
  setWindowSize: (width, height) => dispatch({
    type: actionTypes.SET_WINDOW_SIZE,
    payload: { width, height },
  }),
});


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Store>
    <ConnectedApp />
  </Store>,
  document.getElementById('react-root'),
);
