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
    folderRoot: string;
};
export default _default;
