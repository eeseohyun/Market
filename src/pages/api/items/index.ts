import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../libs/server/client';
import withHandler, { ResponseType } from '../../../../libs/server/withHandler';
import { withApiSession } from '../../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const items = await client.items.findMany({
      include: {
        _count: {
          select: {
            favorite: true,
          },
        },
      },
    });
    res.json({ ok: true, items });
  }
  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const item = await client.items.create({
      data: {
        name,
        price: +price,
        description,
        image: '',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, item });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], fn: handler })
);
