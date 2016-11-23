import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from '../';

describe('Button', function() {

    it('root tag is a html button tag', function() {
        expect(shallow(<Button />).is('button')).to.equal(true);
    });

    it('can have a children node', function() {
        const wrapper = shallow(
            <Button><span>test</span></Button>
        );
        expect(wrapper.find('span').length).to.equal(1)
    });

    it('has a onClick customisable props', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(
            <Button onClick={onButtonClick} />
        );
        wrapper.simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
})
