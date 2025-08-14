import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomCodeService } from '../../services/roomcode.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public joiningName: string = '';
  public roomCode: string = ''; 
  public showJoinErrorCode: boolean = false;

  constructor(private router: Router, private roomCodeService: RoomCodeService) {}

  startSession() {
    this.router.navigate(['/create']);
  }

  attemptJoinSession(name: string, roomCode: string) {
    this.showJoinErrorCode = false;
    this.roomCodeService.checkRoomCode(roomCode).subscribe((exists) => {
      if (exists) {
        this.joinSession(name, roomCode);
      } else {
        this.showJoinErrorCode = true;
      }
    })
  }

  joinSession(name: string, roomCode: string) {
    this.router.navigate(['/join'], { queryParams: { name, roomCode } });
  }

  disableJoinButton(): boolean {
    return this.roomCode.length != 4 || !this.joiningName.trim();
  }
}
