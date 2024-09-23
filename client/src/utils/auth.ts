import {jwtDecode} from 'jwt-decode';
import { UserData } from '../interfaces/userData';

class AuthService {
    getProfile(){
        return jwtDecode<UserData>(this.getToken());
    };

    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired(token: string){
        try {
            const decode: any = jwtDecode(token);

            if(decode?.exp && decode?.exp < Date.now() / 1000){
                this.logout();
                return true;
            };
        } catch (err: any){
            return false;
        };
    };

    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    }

    login(idToken: string){
        localStorage.setItem('id_token', idToken);
        window.location.assign('/')
    }

    logout(){
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();