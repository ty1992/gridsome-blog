import axios from 'axios'

export const getContent = url => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get(url);
      resolve(data);
    }catch(err){
      reject(err);
    }
  })
}

