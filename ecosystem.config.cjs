module.exports = {
    apps: [
        {
            name: "restaurant-saas-front",
            script: "server.js",
            instances: "max",
            exec_mode: "cluster",
            autorestart: true,
        },
    ],
};
