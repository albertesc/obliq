export async function GET() {
  const sheetUrl =
    'https://docs.google.com/spreadsheets/d/1h0sY3oynVmePCZi8K1h-Ct-0nZPwAmecMHfVzHTaHmc/gviz/tq?tqx=out:json';

  const res = await fetch(sheetUrl);
  const text = await res.text();

  const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/);
  if (!jsonMatch || !jsonMatch[1]) {
    return new Response(
      JSON.stringify({ error: 'No se pudo extraer el JSON del Google Sheets' }),
      { status: 500 }
    );
  }

  try {
    const data = JSON.parse(jsonMatch[1]);

    const headers = data.table.cols.map((col: any) => col.label);
    const rows = data.table.rows.map((row: any) =>
      Object.fromEntries(
        row.c.map((cell: any, i: number) => [headers[i], cell?.v ?? null])
      )
    );

    const uniqueDirectors = new Set(rows.map((row: any) => {
      return row['Director'] || '';
    }));

    return new Response(JSON.stringify({ directors: Array.from(uniqueDirectors) }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar los datos del Google Sheets', details: errorMessage }),
      { status: 500 }
    );
  }
}
