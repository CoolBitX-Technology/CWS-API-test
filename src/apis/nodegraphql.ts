import request from './request';

export function getGraphqlNodeEndpoint() {
   const host =  "localhost:8080";
   const init = {
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
   };
  const url = `http://${host}/health`;
  return request(url, init);
}


