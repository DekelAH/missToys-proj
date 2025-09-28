import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { loadToys, removeToy, setFilterBy } from "../store/toy/toy.actions"

import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFIlter"



export function ToyIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {

        const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
        onSetFilterBy(defaultFilter)
        loadToys(defaultFilter)
            .catch(() => showErrorMsg('Cannot load toys'))

    }, [searchParams])

    function onSetFilterBy(filterBy) {

        setSearchParams(filterBy)
        setFilterBy(filterBy)
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
                <ToyFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <div>
                    <button>Add Toy</button>
                </div>
            </section>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </section>
    )
}