-- Permission setup
local allowedAce = "sakiresourcemenu"

local function playerHasPermission(playerId)
    if not playerId then return false end
    return IsPlayerAceAllowed(playerId, allowedAce)
end

local function getResources()
    local resources = {}
    for i = 0, GetNumResources() - 1 do
        local resName = GetResourceByFindIndex(i)
        local resState = GetResourceState(resName)
        resources[#resources + 1] = { name = resName, state = resState }
    end
    return resources
end

RegisterNetEvent("resourcemanager:requestResources", function()
    local src = source
    if not playerHasPermission(src) then
        print(("Player %d tried to open the resource panel but lacks permission"):format(src))
        return
    end

    TriggerClientEvent("resourcemanager:sendData", src, getResources())
end)

RegisterNetEvent("resourcemanager:doAction", function(resource, action)
    local src = source
    if not playerHasPermission(src) then
        print(("Player %d tried to modify resource %s but lacks permission"):format(src, resource))
        return
    end

    if action == "start" then
        StartResource(resource)
    elseif action == "stop" then
        StopResource(resource)
    elseif action == "restart" then
        StopResource(resource)
        StartResource(resource)
    end

    TriggerClientEvent("resourcemanager:sendData", src, getResources())
end)
