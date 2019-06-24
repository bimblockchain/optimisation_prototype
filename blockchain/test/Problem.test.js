const Problem = artifacts.require('./Problem.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Problem contract.
 */
contract('Testing Problem', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     */
    it('Should store the constructor argument(s)', async () => {
        const dummyValue = 123;
        const problem = await Problem.new(dummyValue);
        const problemId = await problem.problemId.call();

        assert.equal(problemId, dummyValue);
    });
});