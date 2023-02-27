import axios from 'axios' 
import store from '@/store/index.js';
function getClientXL() {
    axios
        .post("https://api.agtech.kz/api/workplace",
            {
                "type": "getClientXL",
                "userEmail": store.getters.email
            })
        .then((response) => {
            return this.clientList = response.data
        }
        );
}
function getProviderXL() {
    axios
        .post("https://api.agtech.kz/api/workplace",
            {
                "type": "getProviderXL"
                
            })
        .then((response) => {
            return this.clientList = response.data
        }
        );
}
function getClientDetailXL(clientIin) {
    axios
        .post("https://api.agtech.kz/api/workplace",
            {
                "type": "getClientDetailXL",
                "clientIin": clientIin
            })
        .then((response) => {
            return this.clientList = response.data
        }
        );
}

export { getClientXL, getProviderXL, getClientDetailXL }