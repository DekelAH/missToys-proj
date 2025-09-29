import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";




export function ToyList({ toys, onRemoveToy }) {

    return (

        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}