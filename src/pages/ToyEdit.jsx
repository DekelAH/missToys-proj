import { toyService } from "../services/toy.service"
import { getAllLabels, saveToy } from "../store/toy/toy.actions"
import { showErrorMsg } from "../services/event-bus.service"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.createToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        setToyToEdit((toy) => ({ ...toy, [field]: value }))
    }

    function handleLabelChange({ target }) {
        const value = target.name
        const isChecked = target.checked

        const newLabels = isChecked ? [...toyToEdit.labels, value] : toyToEdit.labels.filter(label => label !== value)

        setToyToEdit(toy => ({ ...toy, labels: newLabels }))
    }

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToyToEdit(toy)
            })
            .catch((error) => {
                console.error('error:', error)
            })
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showErrorMsg('Toy saved successfully!')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }

    const { name, price, labels, inStock } = toyToEdit
    const allLabels = getAllLabels()
    return <>
        <section className="toy-edit">
            <Link to="/toy"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" />
                <label htmlFor="name">Price</label>
                <input onChange={handleChange} value={price} type="number" id="price" name="price" />
                <label htmlFor="labels">Labels</label>
                <div className="labels">
                    {labels &&
                        allLabels.map(label => (
                            <div key={label} className="label">
                                <label>{label}</label>
                                <input onChange={handleLabelChange} type="checkbox" name={label} checked={((labels.indexOf(label)) > -1)} />
                            </div>
                        ))
                    }
                </div>
                <label htmlFor="inStock">inStock : </label>
                <input type="checkbox" name="inStock" id="inStock" checked={inStock} onChange={handleChange} />
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    </>
}