import { v4 as uuidv4 } from 'uuid'


export const getUUID = () => {
    // 先从本地存储 获取 uuid (看一下本地存储里面是否有)
    let localStorageUuid = localStorage.getItem('UUID')
    if (!localStorageUuid) {
        localStorageUuid = uuidv4()
        localStorage.setItem('UUID', localStorageUuid)
    }
    return localStorageUuid
}