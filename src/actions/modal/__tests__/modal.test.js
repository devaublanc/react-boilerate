import { expect } from 'chai';
import { open, close } from 'actions/modal'

describe('Modal actions creator', function() {

    it('able OPEN_MODAL', function() {
        expect(open(42)).to.deep.equal({ type: 'OPEN_MODAL', id: 42 });
    });

    it('able CLOSE_MODAL', function() {
        expect(close()).to.deep.equal({ type: 'CLOSE_MODAL' });
    });

})
