import { useState } from "react"
import { getAllLabels } from "../store/toy/toy.actions.js"


export function ToyFilter({ onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break;

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        onSetFilterBy({ ...filterByToEdit, [field]: value })
    }

    function handleLabelChange({ target }) {
        const value = target.name
        const isChecked = target.checked

        const newLabels = isChecked ? [...filterByToEdit.labels, value] : filterByToEdit.labels.filter(label => label !== value)

        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, labels: newLabels }))
        onSetFilterBy({ ...filterByToEdit, labels: newLabels })
    }

    const { name, inStock, labels } = filterByToEdit
    const allLabels = getAllLabels()
    return <>
        <section className="toy-filter">
            <form className="filter-row">
                <div className="inputs">
                    <label htmlFor="name">Name
                        <input value={name} onChange={handleChange} type="search" placeholder="Enter Toy Name..." id="name" name="name" />
                    </label>
                    <label htmlFor="inStock">Toy Stock
                        <select value={inStock} onChange={handleChange} id="inStock" name="inStock">
                            <option value={undefined}>All</option>
                            <option value={true}>In Stock</option>
                            <option value={false}>Out of Stock</option>
                        </select>
                    </label>
                </div>
                <div className="labels-checkboxes">
                    <div className="labels-grid">
                        {labels &&
                            allLabels.map(label => (
                                <div key={label} className="flex">
                                    <input onChange={handleLabelChange} type="checkbox" name={label} checked={((labels.indexOf(label)) !== -1)} />
                                    <h5 htmlFor="label">{label}</h5>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </form>
        </section>
    </>
}