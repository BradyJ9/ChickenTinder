import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RoomCodeService {

    private controllerEndpoint: string = 'RoomCode'
    
    constructor(private apiClient: ApiClientService) {}

    getRoomCode(): Observable<{roomCode:string}> {
        return this.apiClient.get<{roomCode:string}>(this.controllerEndpoint);
    }

    checkRoomCode(roomCode: string): Observable<boolean> {
        const endpoint = `${this.controllerEndpoint}?roomCode=${encodeURIComponent(roomCode)}`;
        return this.apiClient.get<boolean>(endpoint);
    }

    abandonRoomCode(roomCode: string): Observable<void> {
        return this.apiClient.delete<void>(`${this.controllerEndpoint}?roomCode=${encodeURIComponent(roomCode)}`);
    }
}