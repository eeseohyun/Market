import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../libs/server/client';
import withHandler, { ResponseType } from '../../../../libs/server/withHandler';
import { withApiSession } from '../../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, post });
  }
  if (req.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = req;
    const latitudeNum = parseFloat(latitude + '');
    const longitudeNum = parseFloat(longitude + '');
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonder: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          gte: latitudeNum - 0.01, //크거나 같음 유저가 변경하게끔 수정
          lte: latitudeNum + 0.01, //작거나 같음
        },
        longitude: {
          gte: longitudeNum - 0.01,
          lte: longitudeNum + 0.01,
        },
      },
    });
    res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], fn: handler })
);
