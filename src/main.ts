import processSwagger = require("express-jsdoc-swagger/processSwagger");
import swaggerEventsOptions = require("express-jsdoc-swagger/config/swaggerEvents");
import swaggerEvents = require("express-jsdoc-swagger/swaggerEvents");
import FormData = require('form-data');
import axios from 'axios';
import { GeneratorOptions } from "./options/generator.options";
import { ImportOption } from "./enums/ImportOption.enum";
 

const IMPORT_ENDPOINT = "https://api.theneo.io/v2/project/:projectSlug/import/specfile";

const main = async (generatorOptions: GeneratorOptions) => {
    const { TheneoOptions, SwaggerOptions } = generatorOptions;
    const events = swaggerEvents(swaggerEventsOptions({}));
    const result = await processSwagger(SwaggerOptions, events.processFile);
    const swaggerObject = {
        ...result.swaggerObject,
    };
    const form = new FormData();
    form.append('file', JSON.stringify(swaggerObject, null, 2), 'spec.json');
    form.append('importOption', TheneoOptions.importOption);
    const url = TheneoOptions.importEndpoint || IMPORT_ENDPOINT.replace(':projectSlug', TheneoOptions.projectSlug);
    await axios.post(url, form, {
        headers: {
            github: TheneoOptions.apiKey,
            'Content-Type': 'multipart/form-data',
            'x-import-origin': 'NODE'
        }
    });
    console.info("Spec file has been successfully imported!");
};

export = {
    Theneo: main,
    ImportOption
};
