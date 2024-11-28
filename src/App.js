import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './components/Home';
import {fetchAuthSession} from 'aws-amplify/auth';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


export default function App() {
  return (
    <div style={{backgroundImage: "url(https://task-manager-images-cc-project.s3.us-east-1.amazonaws.com/img/task-management-bg.png)", backgroundSize: 'cover', height: '100vh',margin:'0px'}} >
      <div>
         <Authenticator >
      {({ signOut, user }) => (
        
        <main style={{ height: '100vh'}}>
        {console.log(user)}
        
          <Home signOut={signOut} userId={user.userId}  />
        </main>
      )}
    </Authenticator>
      </div>
    </div>
  );
}