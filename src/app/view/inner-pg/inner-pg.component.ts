import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from 'src/app/sharedServices/cardApiService/api-service.service';
import { CardServiceService } from '../card-service.service';
import { Card } from '../card.model';
import {
  faStar,
  faPerson,
  faMedal,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AmenitiesModalComponent } from './amenities-modal/amenities-modal.component';
@Component({
  selector: 'app-inner-pg',
  templateUrl: './inner-pg.component.html',
  styleUrls: ['./inner-pg.component.css'],
})
export class InnerPgComponent implements OnInit {
  card!: any;
  faPerson: any = faPerson;
  faArrowUpFromBracket: any = faArrowUpFromBracket;
  faHeart: any = faHeart;
  faStar: any = faStar;
  faMedal: any = faMedal;
  faCalendar: any = faCalendar;
  constructor(
    private dialog: MatDialog,
    private cardService: CardServiceService,
    private route: ActivatedRoute,
    private ApiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ApiService.getHotelById(params['id']).subscribe((result) => {
        this.card = result;
        console.log(this.card);
      });
    });
  }
  personCount(room: Array<any>): number {
    let persons = 0;
    room.forEach((bedroom) => {
      persons += bedroom.personsCount;
    });
    return persons;
  }
  bedRoomCount(room: Array<any>): number {
    let beds = 0;
    room.forEach((bedroom) => {
      beds += bedroom.bedsCount;
    });
    return beds;
  }
  bathRoomCount(room: Array<any>): number {
    let baths = 0;
    room.forEach((bedroom) => {
      console.log(parseInt(bedroom.bedsCount));
      baths += bedroom.bathRoomsCount;
    });
    return baths;
  }
  openDialog(offers: any): void {
    const dialogRef = this.dialog.open(AmenitiesModalComponent, {
      width: '780px',
      height: '800px',
      data: { offers: offers },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
