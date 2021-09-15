declare const _default: () => {
    port: string;
    database: {
        type: string;
        host: string;
        port: string;
        username: string;
        autoLoadEntities: boolean;
        charset: string;
        password: string;
        entities: string[];
        database: string;
        synchronize: boolean;
        cli: {
            migrationsDir: string;
        };
        migrationsRun: boolean;
    };
    storageFolder: string;
    provider: string;
    downloadLimit: string | number;
    uploadLimit: string | number;
    bucketName: string;
};
export default _default;
