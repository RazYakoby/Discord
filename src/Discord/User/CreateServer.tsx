import '../../css/CreateServer.css';

function CreateServer () {

    return (
        <>
            <h3 className='title'>Create Your Server</h3>
            <h6 className='subTitle'>Your Server is Where you and your friends hang out. Make</h6>
            <h6 className='subTitle'>yours and start talking</h6>
            <div className='serversTitle'>
                <button><img></img> Create My Own</button>
                <h6>START FROM A TEMPLATE</h6>
                <button><img></img> Gaming</button>
                <button><img></img> School Club</button>
                 <button><img></img> Study Group</button>
                <button><img></img> Friends</button>
                <button><img></img> Artists & Creators</button>
                <button><img></img> Local Community</button>
            </div>
            <div className='footer'>
                <h4>Have an invite already?</h4>
                <button>Join a Server</button>
            </div>
        </>
    )
}

export default CreateServer;