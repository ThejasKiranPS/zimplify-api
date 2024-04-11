export function getEnv(key: string, defaultValue?: string) {
    const val = process.env[key];
    if(!val) {
        if(defaultValue) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is required`);
    }
}