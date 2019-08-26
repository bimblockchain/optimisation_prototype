import BIMManager from "./contracts/BIMManager.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [BIMManager],
  events: {
    BIMManager: ['ProblemOwnerRegistered', 'ProblemOwnerUnregistered','ProblemOptimiserRegistered', 'ProblemOptimiserUnregistered', 'ProblemCreated', 'SolutionCreated'],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
