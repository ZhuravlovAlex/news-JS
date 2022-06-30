type ApiResponse = {
    ok: boolean;
    status: number;
    statusText?: string;
    [key: string]: any;
}

type LoaderOptions = {
    apiKey: string;
}

type LoadMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RespConfigOptions = {
    sources?: number | string
}

type RespConfig = {
    endpoint: string,
    options?: RespConfigOptions
}

interface ILoader {
    getResp: (config: RespConfig, callback: () => void) => void;
    errorHandler: (res : ApiResponse) => ApiResponse;
    makeUrl: (options: RespConfigOptions, endpoint: string) => string;
    load: (method: LoadMethod, endpoint: string, callback: () => void, options: RespConfigOptions) => void
}

export class Loader implements ILoader {

    private readonly baseLink: string;
    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: RespConfig,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: ApiResponse): ApiResponse {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RespConfigOptions, endpoint: string): string{
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: LoadMethod, endpoint: string, callback: Function, options: RespConfigOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }

}