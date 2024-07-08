import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { ACCES_TOKEN, REFRESH_TOKEN } from "@/constans"; // Ensure this path is correct
import { jwtDecode } from "jwt-decode";
import api from "@/api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode; 
}

interface UserDataTypes {
    username: string,
    email:string,
    user: number,
    avatar:string,
    baner:string,
    date_joined:string,
    followership:number[],
    followers:number[]
  }

interface ContextTypes {
    isAuthenticated: boolean;
    follow:(following:number)=>void,
    deletePost:(postId:number)=>void,
    userData:UserDataTypes | null,
    logout:() =>void,
    login:(username:string, password:string) =>void
  }
  
interface TokenTypes {
    exp: number,
    user_id:number
}

const AuthContext = createContext<ContextTypes | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataTypes | null>(null)

  useEffect(() => {
    const authenticate = async () => {
        auth()
        getUserData()
    };
    authenticate();
    console.log(isAuthenticated)
  }, []);

  const getToken = () => {
    const token = localStorage.getItem(ACCES_TOKEN);
    if (!token) {
    setIsAuthenticated(false);
    navigate('/login');
    return
    }
    return jwtDecode<TokenTypes>(token)
  } 

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthenticated(false);
      navigate('/login');
      return;
    }

    try {
      const res = await api.post('/api/accounts/token/refresh/', {
        refresh: refreshToken
      });
      if (res.status > 199 && res.status < 300) {
        localStorage.setItem(ACCES_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    } catch (err) {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  const auth = async (): Promise<void> => {
    const token = getToken()
    if (token){
        const tokenExpiration = token.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
            navigate('/')
        }
    }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
      };

    const login = async (username:string, password:string) => {
        try{
            const res = await api.post('/api/accounts/token/', { username, password })
            localStorage.setItem(ACCES_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            setIsAuthenticated(true)
            navigate('/')
          }
          catch(err) {
            console.log(err)
          } 
    }
    
    const deletePost = async (postId:number) => {
        try {
          api.delete(`/api/posts/delete/${postId}/`)
        } 
        catch(err) {
          console.log(err)
        }
      }

      const getUserData = async () => {
        const token = getToken()
        try {
            const res = await api.get(`/api/accounts/id/${token?.user_id}`);
            setUserData(res.data);
        } catch (err) {
            console.error(err);
        }
      };

    const follow = async (following:number) => {
        try {
            api.post('/api/accounts/follow/', { follows:following, follower:userData?.user})
        } 
        catch(err) {
            console.log(err)
        }
    }

  const values: ContextTypes = {
    isAuthenticated,
    follow,
    deletePost,
    userData,
    logout,
    login
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
