import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../../libs/server/client';
import withHandler, {
  ResponseType,
} from '../../../../../libs/server/withHandler';
import { withApiSession } from '../../../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonder: true,
        },
      },
    },
  });
  const isWondered = Boolean(
    await client.wonder.findFirst({
      where: {
        postId: +id!,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, post, isWondered });
}

export default withApiSession(withHandler({ methods: ['GET'], fn: handler }));
