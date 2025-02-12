import { Component, Input } from '@angular/core';
import { Achievement } from 'src/app/models/achievements.component';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {
  @Input() achievements: Achievement[] = []; 

}
