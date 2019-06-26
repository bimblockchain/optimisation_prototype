const Solution = artifacts.require('./Solution.sol');
const Problem = artifacts.require('./Problem.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Soltuion Contract
**/
contract('Testing Solution', async (accounts) =>{
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should store the constructor arguments', async () => {
        const problem = await Problem.new(123);
        const solution = await Solution.new(problem.address, 456);
        const solutionId = await solution.solutionId.call();

        assert.equal(solutionId, 456);
    });
});