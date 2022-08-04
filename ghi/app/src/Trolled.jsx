function Trolled() {
    return (
        <>
            <div className="video-responsive">
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/2Z4m4lnjxkY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="d-grid gap-2">
            <button variant="secondary" size="lg"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/';
                }}
                >Take me home
            </button>
            </div>
        </>
    )
}

export default Trolled;