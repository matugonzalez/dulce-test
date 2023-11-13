
function FromMenuTreeToMenuItemList(menu = []) {
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = []) {
        pool.forEach((v) => {
            const { title, ...rest } = v
            menuItemList.push(title)
            walk(v.children)
            // if (!v.children.length) {
            //     const { children, title, ...rest } = v
            //     menuItemList.push(title)
            //     return
            // }
            // walk(v.children)
            // const { children, title, ...rest } = v
            // menuItemList.push(title)
        })
    }

    walk(menu)

    return menuItemList
}

function FromSelectedMenuTreeToMenuItemList(menu = []) {
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = []) {
        pool.forEach((v) => {
            if (!v.isSelected) return

            if (!v.children.length) {
                const { children, ...rest } = v
                menuItemList.push(rest)
                return
            }
            walk(v.children)
            const { children, ...rest } = v
            menuItemList.push(rest)
        })
    }

    walk(menu)

    return menuItemList
}

function SwitchSelectedFlagMenuItemBak(pool = [], ids = []) {
    if (!ids.length) return pool
    if (!pool.length) return []

     pool.map((v) => {
        if (v.id !== ids[0]) {
            return {
                ...v,
                isSelected: ids.length === 1 ? false : v.isSelected,
            }
        }

        if (v.children.length) {
            return {
                ...v,
                isSelected: true,
                children: SwitchSelectedFlagMenuItemBak(v.children, ids.slice(1)),
            }
        }

        return {
            ...v,
            isSelected: ids.length === 1
        }
    })
}

function SwitchSelectedFlagMenuItem(pool = [], ids = []) {
    function walk(pool, ids) {
        if (!pool) return

        const out = []

        for (let i = 0; i < pool.length; i++) {
            const item = pool[i]

            if (item.id === ids[0]) {
                if (item.children.length) {
                    out.push({
                        ...item,
                        isSelected: ids.length >= 2 ? (item.children.filter((v) => v.isSelected).length > 1 ? true : !FromIDListToMenuItem(item.children, ids.slice(1))?.isSelected) : true,
                        children: walk(item.children, ids.slice(1))
                    })
                    continue   
                }

                out.push({
                    ...item,
                    isSelected: !item.isSelected
                })
            }
            else {
                out.push({
                    ...item,
                    isSelected: ids.length === 1 ? false : item.isSelected
                })
            }
        }

        return out
    }

    return walk(pool, ids)
}

function DeselectAllMenuTree(pool = []) {
    if (!pool.length) return []

    return pool.map((v) => {
        return {
            ...v,
            isSelected: false,
            children: !v.children.length ? [] : DeselectAllMenuTree(v.children)
        }
    })
}

function FromIDListToMenuItem(menu = [], list = []) {
    if (!list.length) return null
    if (!menu.length) return null

    let found = null

    function walk(pool = [], ids = []) {
        if (!ids.length) return null

        pool.forEach((v) => {
            if (ids[0] === v.id) {
                if (ids.length !== 1) return walk(v.children, ids.slice(1))

                found = v
                return
            }
        })
    }

    walk(menu, list)

    return found
}

function FromIDListToMenuItemList(menu = [], list = []) {
    if (!list.length) return menu
    if (!menu.length) return []

    const menuItemList = []

    function walk(pool = [], ids = []) {
        if (!ids.length) return null

        pool.forEach((v) => {
            if (ids[0] === v.id) {
                menuItemList.push(v)
                return walk(v.children, ids.slice(1))
            }
        })
    }

    walk(menu, list)

    return menuItemList
}

function FromFetchedMenuTreeToClientMenuTree(menu = []) {
    if (!menu.length) return []

    function walk(list = []) {
        return list.map((v) => {
            return {
                ...v,
                isSelected: false,
                isOption: !v.children.length,
                children: walk(v.children) ?? []
            }
        })
    }


    return walk(menu)
}

function FilterUnselectedFromMenuTree(menu = []) {
    if (!menu.length) return []

    function walk(pool) {
        return pool.map((v) => {
            if (!v.isSelected) return null
            return {
                ...v,
                children: FilterUnselectedFromMenuTree(v.children).filter(Boolean)
            }
        }).filter(Boolean)
    }

    return walk(menu)
}

function FromFetchedMenuTreeToAdminMenuTree(menu = []) {
    if (!menu.length) return []

    function walk(list = []) {
        return list.map((v) => {
            return {
                ...v,
                isEditing: false,
                children: walk(v.children) ?? []
            }
        })
    }


    return walk(menu)
}

export { FromMenuTreeToMenuItemList, FromSelectedMenuTreeToMenuItemList, SwitchSelectedFlagMenuItem, DeselectAllMenuTree, FromIDListToMenuItem, FromIDListToMenuItemList, FromFetchedMenuTreeToClientMenuTree, FilterUnselectedFromMenuTree, FromFetchedMenuTreeToAdminMenuTree }
