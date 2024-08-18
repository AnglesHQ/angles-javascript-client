import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

export class KeyCloakService {

  private keycloak: Keycloak;

  public constructor(path: string) {
    this.keycloak = new Keycloak(path);
  }

  public initKeycloak = (initOptions: KeycloakInitOptions, onAuthenticatedCallback: () => void) => {
    this.keycloak.init(initOptions)
      .then((authenticated) => {
        if (!authenticated) {
          // tslint:disable-next-line:no-console
          console.log('user is not authenticated..!');
        }
        // load page
        onAuthenticatedCallback();
      })
      // tslint:disable-next-line:no-console
      .catch(console.error);
  };

  public doLogin = () => this.keycloak.login;

  public doLogout = () => this.keycloak.logout;

  public getToken = () => ()=> this.keycloak.token;

  public getTokenParsed = () => this.keycloak.tokenParsed;

  public isLoggedIn = () => !!this.keycloak.token;

  public updateToken = (successCallback: any) => this.keycloak.updateToken(5)
    .then(successCallback)
    .catch(this.doLogin);

  public getUsername = () => this.keycloak.tokenParsed?.preferred_username;

  public hasRole = (roles: any[]) => roles.some((role) => this.keycloak.hasRealmRole(role));

}

