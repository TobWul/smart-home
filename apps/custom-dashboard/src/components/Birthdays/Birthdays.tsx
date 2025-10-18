import { useEffect } from 'react';
import { notionClient } from '../../lib/notionClient';

const FOLK_DATABASE_ID = 'f32eea4d437d40a1aa8ffe5b533f9a92';

export const Birthdays = () => {
  useEffect(() => {
    const getBirthdays = async () => {
      const response = await notionClient.databases.query({
        database_id: FOLK_DATABASE_ID,
        filter: {
          or: [
            {
              property: 'In stock',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Cost of next trip',
              number: {
                greater_than_or_equal_to: 2,
              },
            },
          ],
        },
      });
      console.log(response);
    };
    getBirthdays();
  });

  return <div>Bursdager</div>;
};
