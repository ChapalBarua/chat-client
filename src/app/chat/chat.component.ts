import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../service/web-socket.service';
import { NgForm } from '@angular/forms';
import { WebsocketChat } from './chat.component.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  user!: string ;
  constructor(public webSocket : WebSocketService, private router: Router) { }

  ngOnInit(): void {
    this.webSocket.openWebSocketConnection();
    if(localStorage.getItem('user')!=null){
      this.user = localStorage.getItem('user') ?? '';
      
    }else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.webSocket.closeWebSocketConnection();
  }

  sendmessage(wsMessageForm: NgForm){
    const chatMsg = new WebsocketChat(this.user+':', wsMessageForm.value.message);
    this.webSocket.sendWebSocketMessage(chatMsg);
    wsMessageForm.controls['message'].reset();
  }
}
