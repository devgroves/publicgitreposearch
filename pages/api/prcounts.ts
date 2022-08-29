// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as https from "https";
import { ClientRequest, IncomingMessage } from 'http';

type ResponseData = {
  data: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const repoName: string = `${req.query.repo}`;
    const url = new URL(`https://api.github.com/repos/${repoName}/pulls`);
    const options = { 'headers' : {
        'Authorization': process.env.token,
        'Accept': "application/vnd.github.v3+json",
        'User-Agent': 'Mozilla/5.0' 
     },
    'method': 'GET',
    };

    const clientreq: ClientRequest = https.request(url, options, (apiresponse: IncomingMessage) => {
        let respJson: string = "";

        apiresponse.on('data', (chunk: string) => { 
          respJson += chunk;
        });

        apiresponse.on('end', () => {
          if (apiresponse.statusCode === 200) {
            let prResponses = JSON.parse(respJson);
            const prCounts = prResponses.length;
            res.status(200).json({'data': prCounts});
          }
        })
    });

    clientreq.on('error', (e: Error) => {
        console.error('error message', e.message);
    });
    clientreq.end();
}
