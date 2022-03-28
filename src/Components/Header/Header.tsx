import AuthStatus from "../AuthStatus/AuthStatus";
import { Search } from "../Search";

import { useAuth } from "../../Methods/UseAuth";

import c from "./header.module.scss"

const Header = () => {
    const auth = useAuth();


    return <header className={c.header}>
        <div className={c.container}>
            <h1 className={c.caption}>Client CRM</h1>
            {auth.user && 
                <>
                    <Search />
                    <AuthStatus />
                </>
            }
        </div>
    </header>;
}

export default Header;