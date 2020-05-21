import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login';

    describe('Login component tests', ()=> {

        it('should render', ()=> {
          expect(render(<Login />));
        });

        it('should render the form', ()=> {
          expect(shallow(<Login />).find('form').exists()).toBe(true)
        })

        it('renders a email input', () => {
          expect(shallow(<Login />).find('#username').length).toEqual(1)
         })

         it('renders a password input', () => {
  expect(shallow(<Login />).find('#password').length).toEqual(1)
 })
    });

    describe('Username input', () => {

      it('should respond to change event and change the state of the Login Component', () => {

       const wrapper = shallow(<Login />);
       wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'MockUser'}});

      expect(wrapper.state('credentials')).toEqual({username: 'MockUser', password: ''});
      })
     })

     describe('Password input', () => {

      it('should respond to change event and change the state of the Login Component', () => {

       const wrapper = shallow(<Login />);
       wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

       expect(wrapper.state('credentials')).toEqual({username: '', password: 'cats'});
      })
     })
