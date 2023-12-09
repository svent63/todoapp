export const DBConfig = {
    name: 'TodoDb',
    version: 1,
    objectStoresMeta: [
        {
            store: 'todo',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'complete', keyPath: 'complete', options: { unique: false } },
                { name: 'task', keyPath: 'task', options: { unique: false } },
            ],
        },
    ],
};
