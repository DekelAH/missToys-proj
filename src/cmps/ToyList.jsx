import { ToyPreview } from "./ToyPreview";




export function ToyList({ toys, onRemoveToy }) {

    return (

        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        <button>Edit</button>
                    </section>
                </li>
            )}
        </ul>
    )
}