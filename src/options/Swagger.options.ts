export class SwaggerOptions {
    info: {
        version: string,
        title: string,
        license: {
            name: string,
        },
    };
    security: {
        BasicAuth: {
            type: string,
            scheme: string,
        },
    };
    baseDir: string;
    filesPattern: string;
}