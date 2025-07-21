import { UserRole } from '../enums/UserRole';

export interface RegisterUserDTO {
   email: string;
   password: string;
   nombre: string;
   celular: string;
   role: UserRole;
}
