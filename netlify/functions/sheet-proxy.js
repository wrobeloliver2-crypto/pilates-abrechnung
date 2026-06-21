export default async (req) => {
  const SHEET_ID   = '1Jmdv9U6A4kFIT-NdS0fx5LTWK1TpA6yc51CRm9-EYvM';
  const URLAUB_ID  = '1E3FSKgMYS_zBmw5Ug6bh-G3eflAQT4zvzEDDswgD5Mk';

  const url    = new URL(req.url);
  const which  = url.searchParams.get('sheet') === 'urlaub' ? URLAUB_ID : SHEET_ID;
  const target = `https://docs.google.com/spreadsheets/d/${which}/export?format=csv&gid=0`;

  try {
    const r = await fetch(target);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const csv = await r.text();
    return new Response(csv, {
      headers: { 'Content-Type': 'text/csv; charset=utf-8' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = { path: '/api/sheet' };
