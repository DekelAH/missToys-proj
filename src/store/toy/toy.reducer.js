import { toyService } from "../../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const EDIT_TOY = 'EDIT_TOY'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const SET_ORDER_BY = 'SET_ORDER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {

    toys: [],
    filterBy: toyService.getDefaultFilter(),
    orderBy: { type: 'name', direction: 1 },
    isLoadinig: true
}


export function toyReducer(state = initialState, cmd) {

    switch (cmd.type) {
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case EDIT_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy),
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
            }
        case SET_FILTER:
            return {
                ...state,
                filterBy: cmd.filterBy
            }
        case SET_ORDER_BY:
            return {
                ...state,
                orderBy: cmd.orderBy
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }

}