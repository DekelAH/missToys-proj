import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Link, useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/toy/toy.actions"
import { showErrorMsg } from "../services/event-bus.service"

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.createToy())

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
            default:
                break;
        }
        setToy((toy) => ({ ...toy, [field]: value }))
    }

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToy(toy)
            })
            .catch((error) => {
                console.error('error:', error)
            })
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(() => {
                showErrorMsg('Toy saved successfully!')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }

    const { name, price,  } = toy

    return (
        <section className="toy-edit">
            <Link to="/toy"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" />
                <label htmlFor="name">Price</label>
                <input onChange={handleChange} value={price} type="number" id="price" name="price" />
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}