import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from "./Header";
import StatusCreate from "./StatusCreate";

describe('App component', () => {
  let appWrapper;
  let appInstance;
  const app = () =>
      shallow(<App />);

  beforeEach(() => {
    appWrapper = app();
    appInstance = appWrapper.instance();
  });

  afterEach(() => {
    appWrapper = undefined;
    appInstance = undefined;
  });

  it('renders without crashing', () => {
    expect(app().exists())
        .toBe(true);
  });

  it('renders a div', () => {
    expect(shallow(<App />).first().type())
        .toBe('div');
  });

  it('renders <Header />', () => {
    expect(appWrapper.find(Header).length)
        .toBe(1);
  });

  it('renders <StatusCreate />', () => {
    expect(appWrapper.find(StatusCreate).length)
        .toBe(1);
  });
});



