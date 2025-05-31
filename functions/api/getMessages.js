export async function onRequestGet(context) {
  const BLOB_URL = 'https://jsonblob.com/api/jsonBlob/1377781148419284992';

  try {
    const response = await fetch(BLOB_URL);
    if (!response.ok) throw new Error('Failed to fetch messages');
    const messages = await response.json();
    return new Response(JSON.stringify(messages), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to load messages', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
