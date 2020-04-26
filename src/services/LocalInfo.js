export default class LocalInfo {
  static get keys() {
    return {
      userId: "user_id",
      storeName: "storeName",
      storeId: "storeId",
      userRole: "user_role",
      username: "username",
      accessToken: "accessToken",
      branchId: "activeBranch",
      userAccess: "userData",
      lastSyncedAt: "lastSyncedAt",
      branches: "branches",
      companyId: "companyId",
      workingDate: "workingDate",
    };
  }

  static get userAccess() {
    return localStorage.getItem(this.keys.userAccess);
  }

  static get workingDate() {
    return localStorage.getItem(this.keys.workingDate);
  }

  static get userId() {
    return JSON.parse(localStorage.getItem('userDetails')).userId;
    //return localStorage.getItem(this.keys.userId);
  }

  static get companyId() {
    return localStorage.getItem(this.keys.companyId);
  }

  static get companies() {
    return ((JSON.parse(this.userAccess)).access).find(company => company.companyId == this.companyId);
  }

  static get username() {
      //alert(this.keys.username);
      return localStorage.getItem(this.keys.username);
  }

  static set lastSyncedAt(datetime) {
    localStorage.setItem(this.keys.lastSyncedAt, datetime);
  }

  static get lastSyncedAt() {
    return localStorage.getItem(this.keys.lastSyncedAt);
  }

  static get storeName() {
    return localStorage.getItem(this.keys.storeName);
  }

  static get branches() {
    return this.companies.branches;
  }

  static get storeId() {
    return localStorage.getItem(this.keys.storeId);
  }

  static get branchId() {
      return localStorage.getItem(this.keys.branchId);
  }

  static get userRole() {
      return ((JSON.parse(this.userAccess)).access[0].role);
      //return localStorage.getItem(this.keys.userRole);
  }

    static get accessToken() {
        return localStorage.getItem(this.keys.accessToken);
    }

  static setUserId(userId) {
    localStorage.setItem(this.keys.userId, userId);
  }

  static setUsername(username) {
      localStorage.setItem(this.keys.username, username);
  }

  static setStoreName(storeName) {
    localStorage.setItem(this.keys.storeName, storeName);
  }

  static setWorkingDate(workingDate) {
    localStorage.setItem(this.keys.workingDate, workingDate);
  }

  static setStoreId(storeId) {
    localStorage.setItem(this.keys.storeId, storeId);
  }

  static setBranchId(branchId) {
      localStorage.setItem(this.keys.branchId, branchId);
  }

  static setUserRole(role) {
    localStorage.setItem(this.keys.userRole, role);
  }

  static setAccessToken(accessToken) {
      localStorage.setItem(this.keys.accessToken, accessToken);
  }

  static setSession(user, store, userStore , token) {
    this.setStoreId(store.id);
    this.setBranchId(store.id);
    this.setStoreName(store.name);
    this.setUserId(user.id);
    this.setUserRole(userStore.role);
    this.setUsername(user.username);
  }

  static sessionExists() {
    return (
      this.userId !== null &&
      this.storeId !== null &&
      this.storeName !== null &&
      this.userRole !== null
    );
  }

  static logout() {
    localStorage.removeItem(this.keys.storeId);
    localStorage.removeItem(this.keys.storeName);
    localStorage.removeItem(this.keys.userId);
    localStorage.removeItem(this.keys.userRole);
    localStorage.removeItem(this.keys.username);
    localStorage.removeItem(this.keys.accessToken);
    localStorage.removeItem(this.keys.branchId);
    localStorage.removeItem(this.keys.companyId);
    localStorage.removeItem(this.keys.workingDate);
    window.location.href = "/";
  }
}
