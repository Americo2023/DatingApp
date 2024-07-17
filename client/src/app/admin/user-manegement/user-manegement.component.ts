import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_modules/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-manegement',
  standalone: true,
  imports: [],
  templateUrl: './user-manegement.component.html',
  styleUrl: './user-manegement.component.css'
})
export class UserManegementComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin', 'Moderator', 'Member'],
        users: this.users,
        rolesUpdated: false
      }
    }

    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  getUsersWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
