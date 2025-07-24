import { UserRole } from '../enums/UserRole';

export interface RegisterUserFullDTO {
   nombre: string;
   email: string;
   password: string;
   celular: string;
   role: UserRole;
}
