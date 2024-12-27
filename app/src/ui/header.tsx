export const Header = () => {
    return (
        <header>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between base:w-10/12 xl:max-w-screen-2xl">
                <p>TypeS</p>
                <div className="space-y-1 hover:cursor-pointer">
                    <span className="w-8 h-0.5 block rounded bg-black" />
                    <span className="w-6 h-0.5 ml-auto block rounded bg-black" />
                    <span className="w-8 h-0.5 block rounded bg-black" />
                </div>
            </nav>
        </header>
    )
}
