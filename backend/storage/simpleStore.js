const store = {
  accounts: [],
  sessions: {},
};

export default {
  addAccount(account) {
    store.accounts.push(account);
  },

  getAccounts() {
    return store.accounts;
  },

  setSession(sessionId, data) {
    store.sessions[sessionId] = data;
  },

  getSession(sessionId) {
    return store.sessions[sessionId];
  },
};
