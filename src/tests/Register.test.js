import React from 'react';
import { shallow, mount, render } from 'enzyme';
import RegisterUser from '../components/RegisterUser';

    describe('RegisterUser component tests', ()=> {

        it('should render', ()=> {
          expect(render(<RegisterUser />));
        });

        it('should render the form', ()=> {
          expect(shallow(<RegisterUser />).find('form').exists()).toBe(true)
        })

        it('renders a username input', () => {
          expect(shallow(<RegisterUser />).find('#username').length).toEqual(1)
         })

         it('renders a password input', () => {
            expect(shallow(<RegisterUser />).find('#password').length).toEqual(1)
           })

           it('renders a password confirmation input', () => {
              expect(shallow(<RegisterUser />).find('#passwordConfirm').length).toEqual(1)
             })
    });

    describe('Username input', () => {

      it('should respond to change event and change the state of the Component', () => {

       const wrapper = shallow(<RegisterUser />);
       wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'MockUser'}});

      expect(wrapper.state('credentials')).toEqual({username: 'MockUser', password: '', passwordConfirm: ''});
      })
     })

     describe('Password input', () => {

      it('should respond to change event and change the state of the Component', () => {

       const wrapper = shallow(<RegisterUser />);
       wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

       expect(wrapper.state('credentials')).toEqual({username: '', password: 'cats', passwordConfirm: ''});
      })
     })

     describe('Password confirmation input', () => {

      it('should respond to change event and change the state of the Component', () => {

       const wrapper = shallow(<RegisterUser />);
       wrapper.find('#passwordConfirm').simulate('change', {target: {name: 'passwordConfirm', value: 'cats'}});

       expect(wrapper.state('credentials')).toEqual({username: '', password: '', passwordConfirm: 'cats'});
      })
     })
