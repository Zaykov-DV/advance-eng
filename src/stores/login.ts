import {defineStore} from 'pinia'
import router from '@/router'
import axios from 'axios'

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        baseURL: 'http://localhost:3000',
        userInfo: null,
        isSignup: true,
        isLogin: false,
        isLoginError: false,
        isAdmin: false,
    }),
    actions: {
        async login(loginObj) {
           await axios.get(this.baseURL + '/users/' + `?user=${loginObj.login}`)
                .then(res => {
                    if (loginObj.password === res.data[0].password) {
                        this.userInfo = res.data[0]
                        this.isLogin = true
                        if (this.userInfo?.role === 'ADMIN') {
                            this.isAdmin = true
                        }
                        router.push('/cabinet')
                    } else {
                        this.isLoginError = true
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.isLoginError = true
                })
        },
    }
})
