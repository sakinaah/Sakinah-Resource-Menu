fx_version 'cerulean'
game 'gta5'

author 'Sakinah'
description 'Resource Manager Menu'
version '1.0.0'

ui_page 'ui/menu.html'

files {
    'ui/menu.html',
    'ui/style.css',
    'main.js'
}

client_scripts {
    'manager_cl.lua',
}

server_scripts {
    'manager_sv.lua',
}