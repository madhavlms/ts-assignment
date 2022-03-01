import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Test App Component', function () {
    const RegisterWrapper = shallow(<App />);
    it('should have a App classname!', function () {
        expect(RegisterWrapper.find(".App").exists()).toBe(true);
    });
    it('should contains routes',function(){
      expect(RegisterWrapper.find(BrowserRouter).exists()).toBe(true);
    });
});
