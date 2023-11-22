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
    session: { user },
    query: { kind },

    //api/users/user/records?kind=
  } = req;
  console.log(kind);
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: 'Sale',
    },
    include: {
      item: {
        include: {
          _count: {
            select: {
              favorite: true,
            },
          },
        },
      },
    },
  });
  res.json({ ok: true, records });
}

export default withApiSession(withHandler({ methods: ['GET'], fn: handler }));
