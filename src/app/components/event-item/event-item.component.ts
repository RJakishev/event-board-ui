import { Component, Input, Output } from '@angular/core';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-item',
  imports: [CommonModule],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItem {
  @Input() event?: Event;
  @Input() eventIdToRegister!: number;

  saveEventId(eventId: any): void {
    this.eventIdToRegister = eventId;
    console.log(eventId);
  }
}