export const sleep = async (timer = 1000) => new Promise<void>(resolve => setTimeout(() => resolve(), timer));