const BIMManager = artifacts.require('BIMManager');

module.exports = function (deployer) {
    deployer.deploy(BIMManager);
};
