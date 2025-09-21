RegisterCommand("panel", function()
    SetNuiFocus(true, true)
    TriggerServerEvent("resourcemanager:requestResources")
end, false)

RegisterNUICallback("closeMenu", function(_, cb)
    SetNuiFocus(false, false)
    cb("ok")
end)

RegisterNUICallback("resourceAction", function(data, cb)
    TriggerServerEvent("resourcemanager:doAction", data.resource, data.action)
    cb("ok")
end)

RegisterNetEvent("resourcemanager:sendData", function(resources)
    SendNUIMessage({
        action = "openMenu",
        resources = resources
    })
end)
