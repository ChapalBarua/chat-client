import { WebsocketChat } from "../chat/chat.component.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class WebSocketService {
    showHome = true;
    websocket!: WebSocket;
    websocketMessage: WebsocketChat[] = [];

    openWebSocketConnection(){
        this.websocket = new WebSocket('ws:chapalbarua.com:3000')
        this.websocket.onopen = e=>{console.log(e)};
        this.websocket.onmessage = e=>{
            console.log(e);
            const chatMsg = JSON.parse(e.data);
            this.websocketMessage.push(chatMsg);
        }
        this.websocket.onclose=e=>{
            console.log(e)
        }
    }

    sendWebSocketMessage(chatMsg: WebsocketChat){
        this.websocket.send(JSON.stringify(chatMsg));
    }

    closeWebSocketConnection(){
        this.websocket.close();
    }
}