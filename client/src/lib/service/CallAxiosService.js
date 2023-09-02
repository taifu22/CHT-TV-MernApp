//appel à notre bdd donc vers son port 4000
import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://ec2-13-51-198-6.eu-north-1.compute.amazonaws.com/'
})

export default Axios