import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'toys'
const labels = ['Doll', 'Battery Powered', 'Baby', 'On wheels', 'Box game', 'Art', 'Puzzle', 'Outdoor']
_createToys()

async function query(filterBy) {
    try {
        let toys = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { name = '' } = filterBy
            toys = toys.filter(toys => toys.name.toLowerCase().includes(name.toLowerCase())
            )
        }
        return toys
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {

    return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function createToy(name = '', price = 0, labels = [], inStock = true) {
    return {
        name,
        price,
        labels,
        inStock
    }
}

function getDefaultFilter() {
    return {
        name: '',
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}



function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: 't101', name: 'Talking Doll', price: 100, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: utilService.getTimeStamp(), inStock: false },
            { _id: 't102', name: 'Remote Car', price: 150, labels: ['Outdoor', 'Battery Powered', 'On wheels'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't103', name: 'Harry Potter Puzzle', price: 180, labels: ['Puzzle', 'Box game'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't105', name: 'Lego Plane', price: 120, labels: ['Puzzle'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't106', name: 'Lego Tank', price: 110, labels: ['Puzzle'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't107', name: 'Action Soldier', price: 40, labels: ['Doll'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't108', name: 'Fisher Price', price: 172, labels: ['Baby'], createdAt: utilService.getTimeStamp(), inStock: false },
            { _id: 't109', name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: utilService.getTimeStamp(), inStock: true },
            { _id: 't110', name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: utilService.getTimeStamp(), inStock: false },
            { _id: 't111', name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: utilService.getTimeStamp(), inStock: true }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




