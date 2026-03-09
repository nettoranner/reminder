import axiosClient from "./axiosClient";

export const userService = {
    getUser: () => {
        return axiosClient.get('/user/me');
    },

    getUserById: (id: number) => {
        return axiosClient.get(`/user/${id}`);
    },

};