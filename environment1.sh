#! /bin/bash
i3-msg 'workspace 1; append_layout .i3/workspace-sample.json'
i3-msg 'workspace 1; exec umlet'
#i3-msg 'workspace 1; exec terminator --working-directory=~/Projects/TN/t4_finagent/data'
#i3-msg 'workspace 1; exec terminator --working-directory=~/Projects/TN/t4_finagent/rest'
#i3-msg 'workspace 1; exec terminator --working-directory=~/Projects/TN/t4_finagent/rest'
i3-msg 'workspace 1; exec urxvt -cd ~/Projects/TN/t4_finagent/data'
i3-msg 'workspace 1; exec urxvt -cd ~/Projects/TN/t4_finagent/rest'
i3-msg 'workspace 1; exec urxvt -cd ~/Projects/TN/t4_finagent/rest'
i3-msg 'workspace 1; exec google-chrome-stable'
#i3-msg 'workspace 1; exec terminator --working-directory=~/Projects/TN/t4_finagent/data'

