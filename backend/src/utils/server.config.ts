let mongoIp = 'localhost';
let mongoPort = '27017';
export const setMongoUri = (uri: string) => {
    mongoIp = uri.split(':')[1].replace(/\/\//, '');
    mongoPort = uri.split(':')[2];
};
export const getMongoUri = () => {
    const host = process.env.DATABASE_SERVICE || mongoIp;

    return `mongodb://${host}:${mongoPort}`;
};
