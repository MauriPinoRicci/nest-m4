import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/users/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
  
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
  
    const userRole = user.role; 
  
    if (!userRole) {
      throw new UnauthorizedException(
        'You do not have permission to access this route',
      );
    }
  
    const hasRole = requiredRoles.includes(userRole);
  
    if (!hasRole) {
      throw new UnauthorizedException(
        'You do not have permission to access this route',
      );
    }
  
    return true;
  }
  
}
