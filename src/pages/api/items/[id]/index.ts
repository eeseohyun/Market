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
  const item = await client.items.findUnique({
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
    },
  });
  const terms = item?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedItems = await client.items.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: item?.id,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6, //6개까지
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        itemId: item?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, item, relatedItems, isLiked });
}

export default withApiSession(withHandler({ methods: ['GET'], fn: handler }));
