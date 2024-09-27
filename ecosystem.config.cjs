module.exports = {
    apps: [
        {
            name: "restaurant-saas-back",
            script: "server.js",
            instances: "max",
            exec_mode: "cluster",
            autorestart: true,
        },
    ],
};
