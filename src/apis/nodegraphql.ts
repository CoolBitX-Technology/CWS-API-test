import request from './request';

export async function getGraphqlNodeEndpoint(level = "prod") {
   const host = level === "prod" ? "cp-production-node-graphql-run-prm3v3teaa-an.a.run.app" : "cp-develop-node-graphql-run-wmh3nzdj4a-an.a.run.app";
   const init = {
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
   };
  const url = `https://${host}/health`;
  return  await request(url, init);
}


