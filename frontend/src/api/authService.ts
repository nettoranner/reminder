import axiosClient from "./axiosClient";

interface RegisterDto {
  username: string
  email: any
  password: string
}

export const authService = {
    //authorization (login)
    login: async (username: string, password: string) => {
        // send a post request to the authoriztion endpoint
         return axiosClient.post('/login', { username, password });
    },

    // Registration
    register: async (data: RegisterDto) => {
        return axiosClient.post('/singup', data);
    },

    logout: () => {
        localStorage.removeItem('access_token');
    }
};