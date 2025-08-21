import { Component, OnInit, NgModule, Input, numberAttribute } from '@angular/core';
import { EventItem } from "../event-item/event-item.component";
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registration } from '../../models/registration';
import { PaginationComponent } from '../pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [PaginationComponent, EventItem, ReactiveFormsModule],
  templateUrl: './event-list.component.html'
})
export class EventList implements OnInit {
  events: Event[] = [];
  totalEventsCount!: number;
  eventIdToRegister!: number;
  registration: Registration = new Registration();
  registrationForm: any;

  @Input({ transform: numberAttribute }) size: any = 20;
  @Input() page!: number;

  constructor(private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.fetchEvents();

    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      personalId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  fetchEvents() {
    console.log('page=', this.page);

    this.eventService.getEvents(this.page,
      Number.isNaN(this.size) ? 1 : this.size,
    )
      .subscribe(
        (data) => {
          this.events = data.content;
          this.totalEventsCount = data.totalElements;
        },
        (error) => {
          console.error('Error fetching all events:', error);
        }
      );
  }
  onOpenRegister(eventId: any): void {
    this.eventIdToRegister = eventId;
  }

  onRegister() {
    this.registration.firstname = this.registrationForm.value.firstname;
    this.registration.lastname = this.registrationForm.value.lastname;
    this.registration.personalId = this.registrationForm.value.personalId;


    if (this.registrationForm.valid) {
      if (this.eventIdToRegister) {
        this.eventService.register(this.eventIdToRegister, this.registration).subscribe({
          next: () => {
            console.log('registered!');
            this.registrationForm.reset();
            this.closeModal();
          },
          error(error) {
            console.log(error);
          }
        });
      }
    }
  }

  closeModal() {
    let closeModalButton = document.getElementById('closeModalButton');
    closeModalButton?.click();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: page === 0 ? null : page,
      },
      queryParamsHandling: 'merge',
    });

    this.fetchEvents();
  }
}
