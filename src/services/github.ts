import { base64Encode } from './utils';

type TGithubStats = {
  numCommitsSinceLastKnownEvent: number;
  reposCommittedTo: { name: string; url: string }[];
};

const getGithubStats = async (): Promise<TGithubStats | null> => {
  try {
    const BASIC_AUTH = base64Encode(`alexieyizhe:${process.env.GITHUB_TOKEN}`);

    const res = await fetch(
      'https://api.github.com/users/alexieyizhe/events/public?per_page=100&page=1',
      {
        headers: {
          Authorization: `Basic ${BASIC_AUTH}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok || !data)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(data)}`);

    const lastKnownEventDate = new Date(data[data.length - 1].created_at);
    const pushEvents = data.filter((event: any) => event.type === 'PushEvent');
    const pushEventRepos = Object.entries<string>(
      pushEvents.reduce((acc: Record<string, string>, curEvent: any) => {
        acc[curEvent.repo.name] = curEvent.repo.url as string;
        return acc;
      }, {})
    ).map(([name, url]) => ({ name, url }));
    const numCommitsSinceLastKnownEvent = pushEvents.reduce(
      (acc: number, curEvent: any) => acc + curEvent.payload.size,
      0
    );

    if (numCommitsSinceLastKnownEvent === 0) {
      throw new Error(`No commits since ${lastKnownEventDate.toString()}!`);
    }

    return {
      numCommitsSinceLastKnownEvent,
      reposCommittedTo: pushEventRepos,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export type { TGithubStats };
export { getGithubStats };
