module.exports = {
    "env": {
        "production": {
            "presets": [
                [
                    "@vue/app", {
                    "modules": false,
                    "targets": ["ie >= 9"]
                }
                ]
            ],
            "comments": false
        },
        "test": {
            "presets": [
                [
                    "env", {"targets": {"node": "current"}}
                ]
            ]
        }
    }
}
