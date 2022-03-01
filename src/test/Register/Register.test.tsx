import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Register from '../../component/Register/Register';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Register Component', function () {
    const RegisterWrapper = shallow(<Register />);
    it('should have a first name field!', function () {
        expect(RegisterWrapper.find({ name: "firstname" }).exists()).toBe(true);
    });
    it('should have a last name field!', function () {
        expect(RegisterWrapper.find({ name: "lastname" }).exists()).toBe(true);
    });
    it('should have required all the fields',function(){
        expect(RegisterWrapper.find({required : true})
        .length===4).toBe(true);
    });
});
