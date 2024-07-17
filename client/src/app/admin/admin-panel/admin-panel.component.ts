import { Component } from '@angular/core';
import { HasRoleDirective } from '../../_directives/has-role.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManegementComponent } from "../user-manegement/user-manegement.component";
import { PhotoManegementComponent } from "../photo-manegement/photo-manegement.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [HasRoleDirective, TabsModule, UserManegementComponent, PhotoManegementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
