const SET_TOKEN='SET_TOKEN'
class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb) {
      let token = localStorage.getItem(SET_TOKEN);
      if(token){
      this.authenticated = true;
      cb();
    }
    }
  
    logout(cb) {
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      let token = localStorage.getItem(SET_TOKEN);
      if(token){
        return this.authenticated = true;
      }
      return this.authenticated = false;
    }
  }
  
  export default new Auth();
  