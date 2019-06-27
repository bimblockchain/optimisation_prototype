const BIMManager = artifacts.require('./BIMManager.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the BIM Manager contract.
 */
contract('Testing BIMManager', async (accounts) => {
    /* Ensures that an address can be registerd as a problem owner
     */
    it('Should register a Problem Owner', async () => {
        const bimManager = await BIMManager.deployed();

        // Check that the address is not already a registered problem owner
        const initialValue = await bimManager.registeredProblemOwners.call(accounts[1]);

        assert.isFalse(initialValue);

        // register the addresss as a client
        await bimManager.registerProblemOwner({ from: accounts[1] });

        // Chack that the address is now successfully registered
        const finalValue = await bimManager.registeredProblemOwners.call(accounts[1]);

        assert.isTrue(finalValue);
    });

    /* Checks that the ProblemOwnerRegistered event is fired when
     * a problem owner is successfully registered
     */
    it('Should fire an event when registering a Problem Owner', async () => {
        const bimManager = await BIMManager.deployed();

        const result = await bimManager.registerProblemOwner({ from: accounts[2] });

        truffleAssert.eventEmitted(result, 'ProblemOwnerRegistered');
    });

    /* When a problem is created, a new instance of the Problem contract is deployed
     * This test checks that the problemId variable has been incremented, showing
     * that a new problem has been added
     */
    it('Should create a problem for a registered problem owner', async () => {
        const bimManager = await BIMManager.deployed();

        // register the problem owner
        await bimManager.registerProblemOwner({ from: accounts[4] });

        // create the Problem
        await bimManager.createProblem({ from: accounts[4] });

        const problemId = await bimManager.problemOwnerProblemIds.call(accounts[4]);

        assert.notEqual(problemId, 0, 'No problem id set');
    });

    /* When a solution is created, a new instance of the Solution contract is deployed
     * This test checks that the solutionId variable has been incremented, showing
     * that a new problem has been added.
     */
    it('Should create a solution for a registered problem optimiser', async () => {
        const bimManager = await BIMManager.deployed();

        // register the problem optimiser
        await bimManager.registerProblemOptimiser({ from: accounts[5] });

        // create the Solution
        await bimManager.createSolution(1, { from: accounts[5] });

        const solutionId = await bimManager.problemOptimiserSolutionIds.call(accounts[5]);

        assert.notEqual(solutionId, 0, 'No problem id set');
    });
});