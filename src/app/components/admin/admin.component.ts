import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Registration } from '../../models/registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  eventForm: any;
  event: Event = new Event();

  constructor(private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventMaxPeople: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit(): void {
    this.event.name = this.eventForm.value.eventName;
    this.event.date = this.eventForm.value.eventDate;
    this.event.maxPeople = this.eventForm.value.eventMaxPeople;

    this.saveEvent(this.event);
  }


  saveEvent(event: Event): void {
    this.eventService.createEvent(event).subscribe({
      next: () => {
        this.eventForm.reset();
        this.router.navigate(['/']);
      },
      error(error) {
        console.log(error);
      }
    });
  }
}
