import { Injectable, NgZone } from '@angular/core';
import { filter, interval, startWith, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var gapi: any;

declare var google: any;

declare function unescape(s:string): string;
declare function escape(s:string): string;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

client!:any;
access_token!:string;

declare window:any;

  clientId="676696119063-sbkuojo53eqk7rav0eim9lekigus3nvb.apps.googleusercontent.com";
  apiKey="AIzaSyA5bmWKT00YGQEqaS11wTrSvnGk8LY-mPQ";

  scope = ['https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send', 
    'https://www.googleapis.com/auth/gmail.readonly'].join(' ');

  constructor(private ngZone:NgZone) { }


  loadGmailClient(){

   this.window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this)
    });
    this.window.google.accounts.id.prompt();

  }

  handleCredentialResponse(response:any){

    console.log(response);

  }


//Call this method
fetchGoogleUser(): Promise<any> {

  return new Promise(async (resolve, reject) => {
      try {
          const gAuth = await this.initGoogleOAuth();

          const oAuthUser = await gAuth.signIn();
          const authResponse = gAuth.currentUser.get().getAuthResponse();

          console.log(`Auht User ${JSON.stringify(oAuthUser)}`);

          console.log(`Auht Response ${JSON.stringify(authResponse)}`);

          // const firebaseUser = await this._af.auth.signInWithCredential(
          //     firebase.auth.GoogleAuthProvider.credential(authResponse.id_token, authResponse.access_token)
          // );

          sessionStorage.setItem('accessToken', authResponse.access_token);

         //resolve(firebaseUser);
      } catch (e) {
          reject(e);
      }
  });
}


initGoogleOAuth(): Promise<any> { 
    
  return new Promise((resolve, reject) => {
     
    gapi.load('auth2', async () => {
          const gAuth = await gapi.auth2.init({
              client_id: environment.GAPI_CLIENT_ID,
              fetch_basic_profile: true,
              scope: this.scope
          });
          resolve(gAuth);
      }, reject);
  });
  
}


refreshToken(){
  
interval(1800 * 1000).pipe(
    //takeUntil(this._af.authState.pipe(filter(u => !u))),
    startWith(5000)
).subscribe(() => {
    gapi.load('auth2', async () => {
        await gapi.auth2.init({
            client_id: environment.GAPI_CLIENT_ID,
            fetch_basic_profile: true,
            scope: 'profile email'
        });
        const authRes = await gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();
        sessionStorage.setItem('accessToken', authRes.access_token);
    });
 });

}

//Call this method
sendEmail() {
  
  // const scopes = [
  //   'https://www.googleapis.com/auth/gmail.send',
  // ].join(' ');

  const message =
    "From: jmlorenzooo@gmail.com\r\n" +
    "To: jmlorenzo@protocolo.palco.cu\r\n" +
    "Subject: As basic as it gets\r\n\r\n" +
    "This is the plain text body of the message.  Note the blank line between the header information and the body of the message.";

  const encodedMessage = window.btoa(message);

  const reallyEncodedMessage = encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  gapi.load('client:auth2', () => {
    
    gapi.client.load('gmail', 'v1', () => {
     
      console.log('Loaded Gmail');
      
      gapi.client.init({
        apiKey: this.apiKey,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        client_id: this.clientId,
        immediate: true,
        scope: this.scope
      }).then(() => {
        console.log('pop')
        return gapi.client.gmail.users.messages.send({
          userId: 'me',
          resource: {
            raw: reallyEncodedMessage
          }
        }).then((res:any) => {
          console.log(`done! ${JSON.stringify(res)}`)
        });
      })
    });
  });
}


//Call this method
checkForGmailLogin() {
  
  console.log('onLoadCallbackFunction');

  const scope = ['https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'].join(' ');

  gapi.auth.authorize(
    {
      'client_id': this.clientId,
      'scope': this.scope,
      'immediate': true,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    }, (authResult:any) => {
     
      if (authResult && !authResult.error) {
        gapi.client.load('gmail', 'v1', () => this.sendEmail2());
      } else {
        console.log('Error in Load gmail');
      }
    });
}

sendEmail2() {

  const subject = 'Code';
  const code = '123'
  const mimeData = [
    "From: jmlorenzooo@gmail.com",
    "To: jmlorenzooo@gmail.com",   
    "Subject: =?utf-8?B?" + window.btoa(unescape(encodeURIComponent(subject))) + "?=",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    "Your code is " + code].join("\n").trim();


  const raw = window.btoa(unescape(encodeURIComponent(mimeData))).replace(/\+/g, '-').replace(/\//g, '_');
  gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': raw
    }
  }).execute((res:any) => {
    console.log('Email sent', res);  
});

}

//Call this method

initClient() {

        this.client = google.accounts.oauth2.initTokenClient({
          client_id: this.clientId,
          scope: 'https://www.googleapis.com/auth/calendar.readonly \
                  https://www.googleapis.com/auth/contacts.readonly',
          callback: (tokenResponse:any) => {
            this.access_token = tokenResponse.access_token;
            console.log(this.access_token)
          },
        });
}


      getToken() {
        this.client.requestAccessToken();
      }
      revokeToken() {
        google.accounts.oauth2.revoke(this.access_token, () => {console.log('access token revoked')});
      }
      loadCalendar() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary/events');
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
        xhr.send();
      }


}
