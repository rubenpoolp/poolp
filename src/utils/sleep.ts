const sleep = async (timeInMs: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });

export default sleep;
