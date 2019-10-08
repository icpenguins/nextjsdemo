import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Navigation from '../../component/navigation'

describe('component:navigation - rendering', () => {
    it('should render without throwing and error', () => {
        expect(shallow(<Navigation />).contains(<div id="nav_links"></div>))
    })
})