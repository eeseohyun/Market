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
  const exist = await client.favorite.findFirst({
    where: {
      itemId: +id!,
      userId: user?.id,
    },
  });
  if (exist) {
    await client.favorite.delete({
      where: {
        id: exist.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        item: {
          connect: {
            id: +id!,
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], fn: handler }));
