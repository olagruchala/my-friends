import React from 'react';
import App from './App';
import Header from "./Header";
import StatusCreate from "./StatusCreate";


describe('App component', () => {
  let appWrapper;
  let appInstance;

  beforeEach(() => {
    appWrapper = shallow(<App />);
    appInstance = appWrapper.instance();
  });

  afterEach(() => {
    appWrapper = undefined;
    appInstance = undefined;
  });

  it('renders without crashing', () => {
    expect(appWrapper.exists())
        .toBe(true);
  });

  it('renders a div', () => {
    expect(appWrapper.first().type())
        .toBe('div');
  });

  describe('the rendered div', () => {

    it('contains everything else that gets rendered', () => {
      expect(appWrapper.first().children()).toEqual(appWrapper.children());
    });
  });

  describe('the onUserNameDefined method', () => {
    const newUser = {
      name: "Kacper",
      email: "ghost@gmail.com"
    };

    it('sets this.state.user to new user', () => {
      appInstance.onUserNameDefined(newUser);
      const userState = appInstance.state.user;
      expect(userState).toEqual(newUser);
    });
  });

  // Header Component in App Component

  it('renders <Header />', () => {
    expect(appWrapper.find(Header).length)
        .toBe(1);
  });

  describe('the rendered <Header />', () => {
    const header = () => appWrapper.find(Header);

    it('receives this.state.user.name as a "name" prop', () => {
      expect(header().prop('name')).toEqual(appWrapper.state('user').name);
    });
  });

  // StatusCreate Component in App Component

  it('renders <StatusCreate />', () => {
    expect(appWrapper.find(StatusCreate).length)
        .toBe(1);
  });

  describe('the rendered <StatusCreate />', () => {
    const statusCreate = () => appWrapper.find(StatusCreate);

    it('allows for a maximum of 300 characters', () => {
      expect(statusCreate().prop('maxLetters')).toEqual(300);
    });

    it('receives this.state.user.name as a "name" prop', () => {
      expect(statusCreate().prop('name')).toEqual(appWrapper.state('user').name);
    });

    it('receives this.state.user.email as a "email" prop', () => {
      expect(statusCreate().prop('name')).toEqual(appWrapper.state('user').email);
    });

  });

});
