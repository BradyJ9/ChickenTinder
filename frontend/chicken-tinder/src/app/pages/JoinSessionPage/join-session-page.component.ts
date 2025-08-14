import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRUserService } from '../../services/signalr-user.service';

@Component({
  selector: 'app-join-session-page',
  imports: [CommonModule],
  templateUrl: './join-session-page.component.html',
  styleUrl: './join-session-page.component.css'
})
export class JoinSessionPageComponent implements OnInit {

  name: string | null = null;
  roomCode: string | null = null;

  connected: boolean = false;

  constructor(private route: ActivatedRoute, private signalRUserService: SignalRUserService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name');
      this.roomCode = params.get('roomCode');
      if (this.roomCode && this.name) {
        this.signalRUserService.startConnection(this.name, this.roomCode);
        this.connected = true;
      }
    });
  }

  backToHomePage() {
    if (this.roomCode) {
      this.signalRUserService.leaveSession(this.roomCode);
    }
  }
}
