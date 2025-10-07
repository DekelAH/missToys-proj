import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabels
}

const STORAGE_KEY = 'toysDB'
const labels = ['Doll', 'Battery Powered', 'Baby', 'On wheels', 'Box game', 'Art', 'Puzzle', 'Outdoor']
_createToys()

async function query(filterBy, orderBy = { field: 'name', direction: 1 }) {
    try {

        let toys = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { name = '' } = filterBy
            toys = toys.filter(toys => toys.name.toLowerCase().includes(name.toLowerCase()))
        }

        if (filterBy) {
            let { inStock } = filterBy
            if (inStock !== undefined && inStock !== 'All') {
                if (inStock === 'true') {
                    return toys = toys.filter(toy => toy.inStock)
                } else {
                    return toys = toys.filter(toy => !toy.inStock)
                }
            }

        }

        if (filterBy) {

            let { labels } = filterBy
            if (labels && labels.length) {
                toys = toys.filter(toy => { return labels.every(label => toy.labels.includes(label)) })
            }

        }
        if (orderBy) {
            toys.sort((a, b) => {
                const { field, direction } = orderBy
                if (a[field] < b[field]) return -1 * direction
                if (a[field] > b[field]) return 1 * direction
                return 0
            })
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

        toyToSave.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function getLabels() {

    return labels
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
        inStock: undefined,
        labels: []
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}



function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: utilService.makeId(), name: 'Talking Doll', price: 100, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: Date.now(), inStock: false },
            { _id: utilService.makeId(), name: 'Remote Car', price: 150, labels: ['Outdoor', 'Battery Powered', 'On wheels'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Harry Potter Puzzle', price: 180, labels: ['Puzzle', 'Box game'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Lego Plane', price: 120, labels: ['Puzzle'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Lego Tank', price: 110, labels: ['Puzzle'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Action Soldier', price: 40, labels: ['Doll'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Fisher Price', price: 172, labels: ['Baby'], createdAt: Date.now(), inStock: false },
            { _id: utilService.makeId(), name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: Date.now(), inStock: true },
            { _id: utilService.makeId(), name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: Date.now(), inStock: false },
            { _id: utilService.makeId(), name: 'Lego Plane', price: 120, labels: ['Box game', 'Art'], createdAt: Date.now(), inStock: true }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




