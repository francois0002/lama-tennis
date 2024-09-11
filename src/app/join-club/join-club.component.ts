import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common'; // Pour ngFor
import { ClubService } from '../api-service/api-services';

@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.component.html',
  styleUrls: ['./join-club.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class JoinClubComponent {
  town: string = '';
  department: string = '';
  region: string = '';
  clubs: any[] = []; // Définir le type d'array en fonction de votre structure de données

  constructor(private clubService: ClubService) {}

  // Fonction pour effectuer la recherche avec les filtres
  searchClubs() {
    console.log('Town:', this.town);
    console.log('Department:', this.department);
    console.log('Region:', this.region);

    this.clubService.getClubs(this.town, this.department, this.region)
      .subscribe({
        next: (data: any[]) => {
          console.log('Data:', data);
          this.clubs = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des clubs:', err);
        }
      });
  }
}

