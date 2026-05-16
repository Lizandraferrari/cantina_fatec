
export default function Header(data){
    return (
        <>
            <header>
                <h1 className="mt-4 mb-0">{data.title}</h1>
                <p className="fs-4">{data.subtitle}</p>
            </header>
        </>
    )
}