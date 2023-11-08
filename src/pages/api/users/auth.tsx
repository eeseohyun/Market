import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../libs/server/client';
import withHandler from '../../../../libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: '유저',
      ...payload,
    },
    update: {},
  }); //create, update, where

  console.log(user);
  console.log(req.body);
  return res.status(200).end();
}

export default withHandler('POST', handler);
