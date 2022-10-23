#! /bin/bash
i3-msg 'workspace 2; append_layout .i3/workspace-sample.json'
i3-msg 'workspace 2; exec umlet'

#i3-msg 'workspace 2; exec terminator --working-directory=~/Projects/TN/t4_finagent/mlsite/t4_viewer'
#i3-msg 'workspace 2; exec terminator --working-directory=~/Projects/TN/t4_finagent/mlsite/t4_viewer/templates/t4_viewer'
#i3-msg 'workspace 2; exec terminator --working-directory=~/Projects/TN/t4_finagent/mlsite/t4_viewer/static/t4_viewer'
#i3-msg 'workspace 2; exec terminator --working-directory=~/Projects/TN/t4_finagent/mlsite/'
i3-msg 'workspace 2; exec urxvt -cd ~/Projects/TN/t4_finagent/mlsite/t4_viewer'
i3-msg 'workspace 2; exec urxvt -cd ~/Projects/TN/t4_finagent/mlsite/t4_viewer/templates/t4_viewer'
i3-msg 'workspace 2; exec urxvt -cd ~/Projects/TN/t4_finagent/mlsite/t4_viewer/static/t4_viewer'
i3-msg 'workspace 2; exec urxvt -cd ~/Projects/TN/t4_finagent/mlsite/'

i3-msg 'workspace 2; exec google-chrome'
