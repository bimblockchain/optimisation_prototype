const Problem = artifacts.require('./Problem.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the Problem contract.
**/
contract('Testing Problem', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should store the constructor arguments', async () => {
        const problem = await Problem.new(123);
        const problemId = await problem.problemId.call();

        assert.equal(problemId, 123);
    });

    /* Problem contract is a state machine. This checks an invalid state change.
     **/
    it('Should revert if moved directly to a complete state', async () => {
        const problem = await Problem.new(123);

        await truffleAssert.reverts(problem.completedProblem());
    });

    /* Every problem requires a problem statement before it can be opened.
     * This test checks that the code reverts if the contract state is moved from
     * 'Draft' -> 'Open' before an IPFS hash is submitted
     **/
    it('Should revert if opened without an IPFS hash', async () => {
        const problem = await Problem.new(123);

        await truffleAssert.reverts(problem.openProblem());
    });

    /* Every problem requires a probleming document before it can be opened.
     * This test checks that the contract can be opened if a hash has been submitted
     **/
    it('Should open if an IPFS hash is set', async () => {
        const problem = await Problem.new(123);

        await problem.setIpfsHash('Any string will work in here');
        const result = await problem.openProblem();

        truffleAssert.eventEmitted(result, 'problemOpened');
    });

    /* Methods are added to return the sontract state. This is testesd here
     **/
    it('Should return true when the contract is in the open state', async () => {
        const problem = await Problem.new(123);

        await problem.setIpfsHash('Any string will work in here');
        await problem.openProblem();

        const result = await problem.problemIsOpen();

        assert.isTrue(result);
    });
});
