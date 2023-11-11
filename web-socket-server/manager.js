let managerDB = {};

const setOnlineUser = (userId, gatewayId) => {
  managerDB = {
    ...managerDB,
    [userId]: gatewayId,
  };
};

const deleteOnlineUser = (gatewayId) => {
  for (let item in managerDB) {
    if (managerDB[item] == gatewayId) {
      delete managerDB[item];
    }
  }
};

export { managerDB };
export default { setOnlineUser, deleteOnlineUser };
