
export default function Header(data){
    return (
        <>
            <header>
                <h1 className="m-auto">{data.title}</h1>
                <p className="fs-4">{data.subtitle}</p>
            </header>
        </>
    )
}