import { Component, OnInit } from '@angular/core';
import { RoomCodeService } from '../../services/roomcode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalRHostService } from '../../services/signalr-host.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-session-page.component.html',
  styleUrl: './create-session-page.component.css'
})
export class CreateSessionPageComponent implements OnInit {

  locationAllowed: boolean = false;
  roomCode: string | null = null;

  public mileRadius: number = 25;
  public fastFood: boolean = true;
  public sitDown: boolean = false;
  public waitingPlayers: string[] = [];
  
  constructor(private roomCodeService: RoomCodeService, private signalRHostService: SignalRHostService, private router: Router) {}

  ngOnInit(): void {
    this.getLocation();

    this.roomCodeService.getRoomCode().subscribe({
      next: (rc) => {
        this.roomCode = rc.roomCode;
        this.signalRHostService.startConnection(this.roomCode);

        this.signalRHostService.userJoined$.subscribe((user) => {
          this.waitingPlayers.push(user);
        })
        this.signalRHostService.userLeft$.subscribe((user) => {
          const index = this.waitingPlayers.indexOf(user);
          if (index !== -1) {
            this.waitingPlayers.splice(index, 1);
          }
        })
      },
      error: (err) => {
        console.error('Error fetching room code:', err);
      }
    });
  }

  backToHomePage() {
    if (this.roomCode) {
      this.roomCodeService.abandonRoomCode(this.roomCode).subscribe();
      this.signalRHostService.abandonSession(this.roomCode);
    }
    this.router.navigate(['']);
  }

  getLocation() {
    this.locationAllowed = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission granted, use position.coords.latitude & position.coords.longitude
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          this.locationAllowed = true;
        },
        (error) => {
          // Permission denied or error occurred
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  shouldDisableBegin() {
    return !this.locationAllowed || (!this.fastFood && !this.sitDown) || this.roomCode === null || this.waitingPlayers.length == 0;
  }
}
