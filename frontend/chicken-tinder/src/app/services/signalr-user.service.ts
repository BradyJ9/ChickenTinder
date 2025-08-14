import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { environment } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})

export class SignalRUserService {
    private hubConnection!: signalR.HubConnection
    private hubUrl: string = environment.sessionHubUrl;    

    public startConnection(userName: string, roomCode: string) {
        if (this.hubConnection && this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
            return; // Already connected or connecting
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl, {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .then(() => {console.log('SignalR connection started'); this.joinSession(userName, roomCode)} )
            .catch(err => console.error('Error starting SignalR connection:', err));

        this.hubConnection.on('SessionAbandoned', () => {
            this.leaveSession(roomCode);
        })
    }

    public joinSession(userName: string, roomCode: string) {
        this.hubConnection.invoke('JoinSession', roomCode);
        this.hubConnection.invoke('NotifyHostOfJoining', userName, roomCode);
    }

    public leaveSession(roomCode: string) {
        this.hubConnection.invoke('LeaveSession', roomCode);
    }
}