import { createContext, useState, ReactNode, useEffect} from "react";
import { ACCES_TOKEN, REFRESH_TOKEN } from "@/constans";
import { jwtDecode } from "jwt-decode"
import api from "@/api"

interface AuthProviderProps {
    children: ReactNode; 
  }

interface ContextTypes {
    isAuthenticated: boolean,
    auth: ()=>void
}

export const AuthContext = createContext<ContextTypes | {}>({})


const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        auth().catch(() => setIsAuthenticated(false))
    })

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/accounts/token/refresh/', {
                refresh: refreshToken
            })
            if (res.status == 200) {
                localStorage.setItem(ACCES_TOKEN, res.data.access)
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }

        } catch(err) {
            console.log(err)
            setIsAuthenticated(false)
        }
        
    }

    const auth = async (): Promise<void> => {
        const token = localStorage.getItem(ACCES_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded: any = jwtDecode(token); 
        const tokenExpiration: number = decoded.exp;
        const now: number = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshToken(); 
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(true);
        }
    };

    console.log(isAuthenticated)
    return (
        <AuthContext.Provider value={{isAuthenticated, auth}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
