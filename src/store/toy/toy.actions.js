import { showErrorMsg } from "../../services/event-bus.service";
import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_FILTER, SET_TOYS } from "./toy.reducer";




export async function loadToys() {

    const filterBy = store.getState().toyModule.filterBy
    try {
        let toys = await toyService.query(filterBy);
        store.dispatch({ type: SET_TOYS, toys });
    } catch (err) {
        console.log('Having issues loading toys:', err);
        showErrorMsg('Having issues loading toys:');
        throw err;
    }
}

export async function saveToy(toyToSave) {

    const type = toyToSave._id ? EDIT_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave);
        store.dispatch({ type, toy });
    } catch (err) {
        console.log('Having issues saving toy:', err);
        throw err;
    }
}

export async function removeToy(toyId) {

    try {
        await toyService.remove(toyId);
        store.dispatch({ type: REMOVE_TOY, toyId });
    } catch (err) {
        console.log('Having issues removing toy:', err);
        throw err;
    }
}

export function setFilterBy(filterBy) {

    store.dispatch({ type: SET_FILTER, filterBy })
}