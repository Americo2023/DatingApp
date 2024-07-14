import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_modules/member';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  standalone: true,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule]
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);
  genderList = [{ value: 'male', display: 'male' }, { value: 'female', display: 'female' }]


  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) {
      this.loadMembers();
    }

  }

  loadMembers() {
    this.memberService.getMembers()
  }

  resetFilters() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(e: any) {
    if (this.memberService.userParams().pageNumber !== e.page) {
      this.memberService.userParams().pageNumber = e.page;
      this.loadMembers();
    }
  }

}
