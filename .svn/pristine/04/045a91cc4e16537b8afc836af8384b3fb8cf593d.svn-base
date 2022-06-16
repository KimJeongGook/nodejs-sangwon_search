#!/bin/sh

pm2 start app.js -n SANGWON_SEARCH --merge-logs --log-date-format="YYYY-MM-DD HH:mm Z" -l /home/node_log/SANGWON_SEARCH/log.log -e /home/node_log/SANGWON_SEARCH/err.log -o /home/node_log/SANGWON_SEARCH/out.log
tail -f /home/node_log/SANGWON_SEARCH/log.log
