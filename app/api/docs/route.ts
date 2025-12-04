import fundsSpec from '../funds/openapi.json';

export async function GET() {
  return Response.json({
    openapi: '3.0.0',
    info: {
      title: 'Liatoshynsky Foundation API',
      version: '1.0.0',
      description: 'API documentation for Liatoshynsky Foundation project'
    },
    servers: [
      {
        url: '/api',
        description: 'API Server'
      }
    ],
    paths: {
      ...fundsSpec.paths
    },
    components: {
      schemas: {
        ...fundsSpec.components?.schemas
      }
    }
  });
}
