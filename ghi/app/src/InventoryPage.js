function InventoryPage() {
    return (
        <>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory/manufacturers';
                }}
                >Manufacturers
            </button>
            &nbsp;
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory/models';
                }}
                >Vehicle Models
            </button>
            &nbsp;
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/services/new';
                }}
                >Automobiles
            </button>
        </>
    )
}

export default InventoryPage;