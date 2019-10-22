import Axios from "axios";

export default new Axios.create({
    baseURL : "http://xsolla-back.it-pokemon.ru/"
})