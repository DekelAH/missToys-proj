import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_FILTER, SET_TOYS } from "./toy.reducer";




export async function loadToys() {

    const filterBy = store.getState().toyModule.filterBy
    try {
        const toys = await toyService.query(filterBy);
        store.dispatch({ type: SET_TOYS, toys });
    } catch (err) {
        console.log('Having issues loading toys:', err);
        showErrorMsg('Having issues loading toys:');
        throw err;
    }
}

export function setFilterBy(filterBy) {

    store.dispatch({ type: SET_FILTER, filterBy })
}