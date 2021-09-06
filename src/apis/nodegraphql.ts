import request from './request';

export async function getGraphqlNodeEndpoint() {
   const host =  "api.wallet.cbx.io";
   const init = {
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
   };
  const url = `https://${host}/health`;
  return  await request(url, init);
}


