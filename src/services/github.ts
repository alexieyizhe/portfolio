const getLatestCommitRepo = async () => {
  try {
    const res = await fetch(
      'https://api.github.com/users/alexieyizhe/events/public?per_page=1&page=1'
    );

    const data = await res.json();
    if (!res.ok)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(data)}`);

    const repo = data?.[0].repo.name;
    console.log(repo);
    return repo as string;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getLatestCommitRepo };
