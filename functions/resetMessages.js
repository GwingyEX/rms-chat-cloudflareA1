export async function onRequestPost(context) {
  const BLOB_URL = 'https://jsonblob.com/api/jsonBlob/1377781148419284992';

  try {
    const newMessages = await context.request.json();

    const res = await fetch(BLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessages),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`JSONBlob PUT failed: ${res.status} ${text}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Reset failed', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
