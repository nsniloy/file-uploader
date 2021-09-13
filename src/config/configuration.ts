import dbConfig from './database.config';

export default () => {
  return {
    port: process.env.PORT,
    database: dbConfig,
    folderRoot: process.env.FOLDER
  }
};
