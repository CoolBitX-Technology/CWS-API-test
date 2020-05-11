async function request(url: string, option?: any): Promise<{ detail: string; status: number }> {
  try {
    const res = await fetch(url, option);
    try {
      if (res.status === 200) {
        const result = await res.json();
        return { detail: JSON.stringify(result), status: 1 };
      } else {
        const detail = await res.text();
        return { detail, status: 1 };
      }
    } catch (error) {
      return { detail: 'convert to text error', status: 2 };
    }
  } catch (error) {
    return { detail: error.toString(), status: 2 };
  }
}

export default request;
