import { ImportOption } from "../enums/ImportOption.enum";

export class TheneoOptions {
    apiKey: string;
    projectSlug: string;
    importOption: ImportOption;
    importEndpoint?: string;
}