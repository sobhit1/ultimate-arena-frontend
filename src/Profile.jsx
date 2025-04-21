function Profile() {
    return (
        <div className="profileContainer p-10">
            <h2 className="profileDetails">Name: Sobhit Raghav</h2>
            <h2 className="profileDetails">Username: destroyer69</h2>
            <h2 className="profileDetails">Contests Participated: 41</h2>
            <div className="mt-4">
                <h2 className="profileDetails">Codeforces IDs:-</h2>
                <ol className="list-decimal list-inside">
                    <li className="font-rubik text-[1.5rem] font-[400] ">ap12345 
                        <button type="button" className="pt-1 pr-4 pb-1 pl-4 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                        </button>
                    </li>
                </ol>
                <button type="button" className="pt-1 pr-4 pb-1 pl-4 mt-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                    </svg>
                </button>
            </div>
            <button type="button" className="fixed bottom-20 left-1/2 -translate-x-1/2 pt-1.5 pr-6 pb-1.5 pl-6 rounded-xl text-lg bg-red-600 text-white cursor-pointer">Log Out</button>
        </div>
    );
}

export default Profile;