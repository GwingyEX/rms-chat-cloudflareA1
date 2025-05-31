export async function onRequestPost(context) {
  const BLOB_URL = 'https://jsonblob.com/api/jsonBlob/1377781148419284992';

  try {
    const newMessage = await context.request.json();
    const res = await fetch(BLOB_URL);
    const messages = await res.json();

    messages.push({
      name: newMessage.name,
      text: newMessage.text,
      time: Date.now(),
    });

    await fetch(BLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to post message', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
