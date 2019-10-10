import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '../../component/navigation'

describe('component:navigation - rendering', () => {
    it('should render without throwing and error', () => {
        expect(shallow(<Navigation />).contains(<div id="nav_links"></div>))
    })

    it('should be selectable by ID "nav_links"', function() {
        expect(shallow(<Navigation />).is('#nav_links')).toBe(true);
    });
})