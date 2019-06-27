const IpfsHashHolder = artifacts.require('./IpfsHashHolder.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the IpfsHashHolder contract.
**/
contract('Testing IpfsHashHolder', async (accounts) => {
    /* The purpose of this test is to make sure that the contract corectly stores the
     * supplied string in the ipfsHash variable.
     **/
    it('Should store accept an arbitrary string representing an IPFS file hash', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const actual = await ipfsHashHolder.ipfsHash.call();

        assert.equal(sampleIpfsHash, actual);
    });

    /* The should test that the string sent is a valid IPFS hash, but currenly only
     * determines that the string is not the empty string
     **/
    it('Should store revert if an invalid hash is sent', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = '';

        await truffleAssert.reverts(ipfsHashHolder.setIpfsHash(sampleIpfsHash));
    });

    /* Checks that the event is emitted when the string is set.
     * This is used by the UI to report that async operation has completed.
     **/
    it('Should emit an ipfsSent event', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        const result = await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        truffleAssert.eventEmitted(result, 'ipfsSent');
    });

    /* Checks that the contract can accurately report when a string is / is not set
     * Simply tests for empty string, should test for actual valid IPFS string
     **/
    it('Should correctly identify that a hash IS NOT set', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();

        const result = await ipfsHashHolder.hashIsSet.call();

        assert.isFalse(result);
    });

    /* Checks that the contract can accurately report when a string is / is not set
     * Simply tests for empty string, should test for actual valid IPFS string
     **/
    it('Should correctly identify that a hash IS set', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const result = await ipfsHashHolder.hashIsSet.call();

        assert.isTrue(result);
    });

    /* Checks the contract can clear the variable storig the IPFS hash
     **/
    it('Should clear a hash when insturcted to', async () => {
        const ipfsHashHolder = await IpfsHashHolder.new();
        const sampleIpfsHash = 'QmPCmCERPsc8NDQkDCQ3bpz8FNWP2bf8UhDszaWgsWVHJK';

        await ipfsHashHolder.setIpfsHash(sampleIpfsHash);

        const result1 = await ipfsHashHolder.hashIsSet.call();

        await ipfsHashHolder.clearHash();

        const result2 = await ipfsHashHolder.hashIsSet.call();

        assert.isTrue(result1);
        assert.isFalse(result2);
    });
});
