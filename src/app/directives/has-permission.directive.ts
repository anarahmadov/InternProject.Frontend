import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  private permissionsSubject = new BehaviorSubject<string[]>([]);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}

  @Input() set hasPermission(permission: string) {
    setTimeout(() => {
      let hasAccess = this.permissionsSubject.getValue().includes(permission);

      if (hasAccess) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }, 10);
  }

  ngOnInit(): void {
    this.authService.permissions$.subscribe((permissions) => {
      this.permissionsSubject.next(permissions);
    });
  }
}