const CronJob = require("cron").CronJob;

/** It's running on every 3 second */
new CronJob(
    "* 8 * * *",
    function () {
        console.log("It's running on 8 o'clock");
    },
    null,
    false,
    "Asia/Kolkata"
).start();