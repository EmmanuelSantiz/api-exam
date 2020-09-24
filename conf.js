let config = {
    databasedev() {
        return {
            host: 'YourHost',
            user: 'user',
            password: 'password',
            database: 'database',
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
