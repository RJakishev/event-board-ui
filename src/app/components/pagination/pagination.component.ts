import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  imports: [NgbPaginationModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() currentpage!: number;
  @Input() size!: number;
  @Input() totalItems!: number;
  @Input() maxSize!: number;
  @Input() displaySize!: string;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();


  get totalPages(): number {
    return Math.ceil(this.totalItems / this.size);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
