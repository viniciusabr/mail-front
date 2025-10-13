// import axios from 'axios'

// console.log("Base da API:", import.meta.env.VITE_API_URL);

// const api = axios.create({
//     baseURL: 'http://localhost:3000'
// })


// export default api;



import axios from 'axios';

const api = axios.create({
    baseURL:
        import.meta.env.MODE === 'development'
            ? 'http://localhost:3000/'
            : 'https://mail-pj9m.onrender.com/',
});

export default api;