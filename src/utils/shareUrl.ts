export const shareUrl = async (value: string) => {
  try {
    const data = {
      url: value,
    };

    if (navigator?.share && navigator?.canShare(data)) {
      await navigator.share(data);
      return true;
    } else return false;
  } catch (err) {
    if (err?.toString()?.includes("AbortError")) return true;
    else return false;
  }
};
