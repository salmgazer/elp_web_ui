export default class LocalInfo {
  static get keys() {
    return {
      userId: "user_id",
      storeName: "storeName",
      storeId: "storeId",
      userRole: "user_role",
      username: "username",
      accessToken: "accessToken",
    };
  }

  static get userId() {
    return localStorage.getItem(this.keys.userId);
  }

  static get username() {
      alert(this.keys.username);
      return localStorage.getItem(this.keys.username);
  }

  static get storeName() {
    return localStorage.getItem(this.keys.storeName);
  }

  static get storeId() {
    return localStorage.getItem(this.keys.storeId);
  }

  static get userRole() {
    return localStorage.getItem(this.keys.userRole);
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

  static setStoreId(storeId) {
    localStorage.setItem(this.keys.storeId, storeId);
  }

  static setUserRole(role) {
    localStorage.setItem(this.keys.userRole, role);
  }

  static setSession(user, store, userStore) {
    this.setStoreId(store.id);
    this.setStoreName(store.name);
    this.setStoreCode(store.code);
    this.setUserId(user.id);
    this.setUserRole(userStore.role);
    this.setUsername(userStore.username);
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
    window.location.href = "/";
  }
}
