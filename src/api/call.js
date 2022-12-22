import {API} from './config';

export const login = async body => {
  try {
    console.log(body);

    const {data} = await API.post('/login', body);
    // const {data} = API.get('/test');
    return data.data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
