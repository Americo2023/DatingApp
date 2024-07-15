import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { Member } from '../_modules/member';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ButtonsModule, FormsModule, MemberCardComponent, MemberCardComponent, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit, OnDestroy {
   likeService = inject(LikesService);
  predicate = 'liked'
  pagedNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
  }

  getTitle() {
    switch (this.predicate) {
      case 'liked':
        return 'Members you liked';
      case 'likedBy':
        return 'Members who like you';
      default:
        return 'Mutual'
    }
  }

  loadLikes() {
    this.likeService.getLikes(this.predicate, this.pagedNumber, this.pageSize);
  }

  pageChanged(e: any) {
    if (this.pagedNumber !== e.page) {
      this.pagedNumber = e.page;
      this.loadLikes();
    }
  }

  ngOnDestroy(): void {
    this.likeService.paginatedResult.set(null)
  }
}
