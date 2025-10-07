import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet, useSearchParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { debounce, getExistingProperties } from "../services/util.service"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { loadToys, removeToy, setFilterBy, setOrderBy } from "../store/toy/toy.actions"

import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFIlter"
import { ToySortBy } from "../cmps/ToySortBy"



export function ToyIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {

        const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
        onSetFilterBy(defaultFilter)
        loadToys()
            .catch(() => showErrorMsg('Cannot load toys'))

    }, [])

    function onSetFilterBy(filterBy) {

        setFilterBy(filterBy)
        setSearchParams(getExistingProperties(filterBy))
        loadToys()
            .catch(() => showErrorMsg('Cannot load toys'))
    }

    function onSetOrderBy(orderBy) {

        setOrderBy(orderBy)
        loadToys()
    }

    function onRemoveToy(toyId) {

        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed successfully!');
            })
            .catch(() => {
                showErrorMsg(`Having issues removing toy (${toyId})`);
            });
    }

    return (

        <section className="toy-index">
            <section className="filter-add-section">
                <ToyFilter onSetFilterBy={debounce(onSetFilterBy, 500)} filterBy={filterBy} />
                <ToySortBy onSetOrderBy={debounce(onSetOrderBy, 500)} />
                <div>
                    <button><Link to={'/toy/edit'}>Add Toy</Link></button>
                </div>
            </section>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            <Outlet />
        </section>
    )
}