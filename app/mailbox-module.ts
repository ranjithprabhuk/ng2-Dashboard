import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComposeMailComponent } from './components/mailbox/compose-mail-component';
import { ReadMailComponent } from './components/mailbox/read-mail-component';
import { MailBoxComponent } from './components/mailbox/mailbox-component';

import { InboxComponent } from './components/mailbox/inbox-component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mailbox',
        component: MailBoxComponent,
        children: [
          {
            path: '',
            component: ReadMailComponent
          },
          {
                path: 'inbox',
                component: InboxComponent
              },
              {
                path: 'compose',
                component: ComposeMailComponent
              }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: [ComposeMailComponent,ReadMailComponent,MailBoxComponent,InboxComponent]
})
export class MailBoxRoutingModule { }