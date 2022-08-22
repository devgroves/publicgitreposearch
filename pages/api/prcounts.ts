// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

let https: any;
try {
    https = require('https');
} catch (err) {
  console.log('https support is disabled!');
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const repoName = req.query.repo;
    const url = new URL(`https://api.github.com/repos/${repoName}/pulls`);
    console.log('url ', url.toString());
    const options = { 'headers' : {
        'Authorization': `token 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`,
        'Accept': "application/vnd.github.v3+json",
        'User-Agent': 'Mozilla/5.0' 
     },
    'method': 'GET',
    };

    const clientreq = https.request(url, options, (githubres: any) => {
        console.log('statusCode:', githubres.statusCode);
        let respJson: string = "";
        // Print the HPKP values

        githubres.on('data', (chunk: string) => { 
          respJson += chunk;
        });

        githubres.on('end', () => {
          if (githubres.statusCode === 200) {
            let prResponses = JSON.parse(respJson);
            const prCounts = prResponses.length;
            res.status(200).json({'data': prCounts});
          }
        })
    });

    clientreq.on('error', (e: any) => {
        console.error('error message', e.message);
    });
    clientreq.end();
}
