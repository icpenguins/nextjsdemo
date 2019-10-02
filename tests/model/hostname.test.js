'using strict'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme';

import HostName from '../../model/hostname';

Enzyme.configure({ adapter: new Adapter() })

var wrapper

// https://jestjs.io/docs/en/setup-teardown
// Why: https://stderr.brandonistenes.com/testing-nextjs-pages-with-enzyme/
beforeEach(async () => {
    const props = await HostName.getInitialProps()

    wrapper = shallow(<HostName { ...props }/>);
})

test('Test ', () => {
    expect(wrapper).toMatchSnapshot();
});