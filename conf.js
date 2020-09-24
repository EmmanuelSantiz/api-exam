let config = {
    databasedev() {
        return {
            host: 'dev-database-kuik.c5ermeo2cnt4.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'kUyK4dm1n',
            database: 'kuik',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }
    },
    env: 'local',
    getUri(opt) {
        switch(opt) {
            case 'local':
                return 'http://localhost:4000';
                break;
        }
    }
}

module.exports = config;
