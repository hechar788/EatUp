import '../../styles/homeHeader.css'

export default function HomeHeader() {
    let changeLocationPopup = () => {
        console.log('Change button clicked.')
    }

    return (
       <div className="home-header-container">
            <span>Christchruch, New Zealand <a onClick={() => { changeLocationPopup() }}><strong>Change...</strong></a></span>
            <form>
                <input type="text" placeholder="Start typing..."/>
            </form>
            Cuisine Type Carousel Here - Create a seperate component and load through this component
        </div>
    )
}