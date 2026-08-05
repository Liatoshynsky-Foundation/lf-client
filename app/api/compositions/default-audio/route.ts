import { DEFAULT_COMPOSITION_SOURCE_URL } from '~/constants/audioPlayer';

import logger from '~/middleware/logger/logger';

const AUDIO_CACHE_CONTROL = 'public, max-age=604800, immutable';

const copyHeader = (source: Headers, target: Headers, name: string) => {
  const value = source.get(name);
  if (value) {
    target.set(name, value);
  }
};

export async function GET(request: Request) {
  try {
    const rangeHeader = request.headers.get('range');
    const audioResponse = await fetch(DEFAULT_COMPOSITION_SOURCE_URL, {
      method: 'GET',
      headers: rangeHeader ? { Range: rangeHeader } : {},
      next: { revalidate: 0 }
    });

    const headers = new Headers();
    copyHeader(audioResponse.headers, headers, 'Content-Type');
    copyHeader(audioResponse.headers, headers, 'Content-Length');
    copyHeader(audioResponse.headers, headers, 'Content-Range');
    headers.set('Accept-Ranges', audioResponse.headers.get('Accept-Ranges') ?? 'bytes');
    headers.set('Cache-Control', AUDIO_CACHE_CONTROL);

    return new Response(audioResponse.body, {
      status: audioResponse.status,
      statusText: audioResponse.statusText,
      headers
    });
  } catch (error) {
    logger.error('[API:GET:compositions:default-audio] Failed to stream default composition audio', error);
    return Response.json({ message: 'Failed to stream default composition audio' }, { status: 502 });
  }
}
