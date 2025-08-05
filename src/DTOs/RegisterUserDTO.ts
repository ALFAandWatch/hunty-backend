import { UserRole } from '../enums/UserRole';

export interface RegisterUserDTO {
   nombre?: string;
   celular?: string;
   role?: UserRole;
   credencialId?: string;
}
