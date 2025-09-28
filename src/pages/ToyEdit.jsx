import { useState } from "react"
import { toyService } from "../services/toy.service"
import { useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/toy/toy.actions"

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
        setRobot((toy) => ({ ...toy, [field]: value }))
    }

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setRobot(toy)
            })
            .catch((error) => {
                console.error('error:', error)
            })
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(() => {
                showSuccessMsg('Toy saved successfully!')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }

    const { model, type, batteryStatus } = toy

    return (
        <section className="toy-edit">
            <Link to="/toys"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}>
                <label htmlFor="model">Model</label>
                <input onChange={handleChange} value={model} type="text" id="model" name="model" />

                <label htmlFor="type">Type</label>
                <select onChange={handleChange} value={type} id="type" name="type"  >
                    <option disabled value="">Choose a type</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Pleasure">Pleasure</option>
                    <option value="Office">Office</option>
                </select>

                <label> Battery status {batteryStatus}
                    <input onChange={handleChange} value={batteryStatus} type="range" id="batteryStatus" name="batteryStatus" />
                </label>
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}