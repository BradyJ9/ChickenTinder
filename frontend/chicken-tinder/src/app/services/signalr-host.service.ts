import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { environment } from "../../environments/environments";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: 'root'
})

export class SignalRHostService {
    private hubConnection!: signalR.HubConnection
    private hubUrl: string = environment.sessionHubUrl;
    private userJoinedSubject = new Subject<string>();
    private userLeftSubject = new Subject<string>();

    userJoined$ = this.userJoinedSubject.asObservable();
    userLeft$ = this.userLeftSubject.asObservable();

    public startConnection(roomCode: string) {
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
            .then(() => {console.log('SignalR connection started'); this.joinSession(roomCode)} )
            .catch(err => console.error('Error starting SignalR connection:', err));

        this.hubConnection.on("UserJoined", (name) => {
            this.userJoinedSubject.next(name);
        })

        this.hubConnection.on("UserLeft", (name) => {
            this.userLeftSubject.next(name);
        })
    }

    public joinSession(roomCode: string) {
        this.hubConnection.invoke('JoinSession', roomCode);
    }

    public abandonSession(roomCode: string) {
        this.hubConnection.invoke('AbandonSessionAsHost', roomCode);
    }
}