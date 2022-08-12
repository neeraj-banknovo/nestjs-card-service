import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector, } from '@nestjs/core';
import { get, } from 'lodash';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // inject your deps here
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const role = get(request, 'headers.role', '');
    return roles.includes(role);
  }
}
